import Cookies from 'js-cookie'
import {API_SERVER_PREFIX} from '../settings'


async function requestToServer(url, data, method, isJson = false, retry = true) {
    const req = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    if(Cookies.get('auth')) {
        req.headers['auth'] = Cookies.get('auth')
    }
    if(data) {
        req.body = JSON.stringify(data)
    }
    let networkError = false;
    const rawResponse = await fetch(`${API_SERVER_PREFIX}${url}`, req).catch(()=>networkError=true);
    if(networkError) {
        throw "check your connection to the server" // todo handle network error
    }

    if(rawResponse.status >= 300 || rawResponse.status < 200) {
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
    if("auth-username" in rawResponse.headers)
        Cookies.set("username", rawResponse.headers["auth-username"])
}
async function retryRequestError(rawResponse, url, data, method, isJson) {
    if(rawResponse.status === 401) {
        // todo handle unauthorized
        Cookies.set("username", "")
    }
    // either throw or sendRequest again!
    throw await rawResponse.text()
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
    return await postRequestToServer("/auth/login/", {username, password}, false)
        .then(token=>Cookies.set('auth', token))
        .then(()=>Cookies.set("username", username))
}
export async function register({username, password, isAdmin}) {
    return await postRequestToServer("/auth/signup/", {username, password, isAdmin})
        .then(token=>Cookies.set('auth', token))
        .then(()=>Cookies.set("username", username))
}
export function logout() {
    Cookies.set("username", "")
    Cookies.set("auth", "")
}
