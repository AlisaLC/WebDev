import Cookies from 'js-cookie'
import {API_SERVER_PREFIX} from '../settings'


async function requestToServer(url, data, method, isJson = false, retry = true) {
    const req = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: "include"
    }
    if(data) {
        req.body = JSON.stringify(data)
    }
    let networkError = false;
    const rawResponse = await fetch(`${API_SERVER_PREFIX}${url}`, req).catch(()=>networkError=true);
    if(networkError) {
        throw "check your connection to the server" // todo handle network error
    }
    console.log(rawResponse)
    console.log(rawResponse.headers)
    console.log('data', rawResponse.data)
    // todo error handler
    if(rawResponse.status !== 200) {
        if(!retry)
            throw await rawResponse.text()
        return await retryRequestError(rawResponse, url, data, method, isJson)
    } else {
        setCookiesFromResponse(rawResponse)
        if(isJson) {
            return await rawResponse.json()
        } else {
            return await rawResponse.text()
        }
    }
}
function setCookiesFromResponse(rawResponse) {
    // todo do we have username?
    if("username" in rawResponse.headers)
        Cookies.set("username", rawResponse.headers["username"])
}
async function retryRequestError(rawResponse, url, data, method, isJson) {
    if(rawResponse.status === 401) {
        // todo remove auth tokens
        Cookies.set("username", "")
        console.log("WE SHOULD REDIRECT TO LOGIN PAGE HERE")
    }
    // todo either throw or sendRequest again!
    throw await rawResponse.text()
    // todo handle unauthorized

    // if (error instanceof BadRequestError) {
    //     reply.status(400).send(error.message)
    // } else if (error instanceof UnauthorizedError) {
    //     reply.status(401).send(error.message)
    // } else if (error instanceof AccessForbiddenError) {
    //     reply.status(403).send(error.message)
    // } else if (error instanceof NotFoundError) {
    //     reply.status(404).send(error.message)
    // } else if (error instanceof ConflictError) {
    //     reply.status(409).send(error.message)
    // } else if (error instanceof TooManyRequestsError) {
    //     reply.status(429).send(error.message)
    // } else if (error instanceof InternalError) {
    //     reply.status(500).send(error.message)
    // } else {
    //     reply.status(500).send(error)
    // }
}

async function postRequestToServer(url, data, isJson= false) {
    return await requestToServer(url, data, "POST", isJson)
}
async function putRequestToServer(url, data, isJson= false) {
    return await requestToServer(url, data, "PUT", isJson)
}
async function deleteRequestToServer(url, data, isJson= false) {
    return await requestToServer(url, data, "DELETE", isJson)
}
async function getRequestToServer(url, data, isJson= false) {
    return await requestToServer(url, data, "GET", isJson)
}




export async function getAllNotes() {
    return await getRequestToServer(`/notes/`, null, true)
}
export async function createNote({title, text}) { // returns result note
    return await postRequestToServer(`/notes/new`, {title, text}, true)
}
export async function getNote({id}) {
    return await getRequestToServer(`/notes/${id}`, null, true)
}
export async function updateNote({id, title, text}) {
    return await putRequestToServer(`/notes/${id}`, {title, text}, true)
}
export async function deleteNote({id}) {
    return await deleteRequestToServer(`/notes/${id}`, null, true)
}
export async function login({username, password}) {
    // todo remove then. IT WAS ONLY FOR SETTING COOKIE!
    return await postRequestToServer("/auth/login/", {username, password})
        .then(()=>Cookies.set("username", username))
}
export async function register({username, password}) {
    // todo remove then. IT WAS ONLY FOR SETTING COOKIE!
    return await postRequestToServer("/auth/signup/", {username, password})
        .then(()=>Cookies.set("username", username))
}
export function logout() {
    // todo erase cookies here
    Cookies.set("username", "")
}
