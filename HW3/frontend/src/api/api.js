// todo remove sleep and dummy backend

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// this is dummy backend
let notes = {
    1: {title: "abcdefghijklmnopqrstuvwxyz", text: "text1"},
    2: {title: "title2", text: "teasldkjakaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaxt2"},
    3: {title: "title3", text: "text3"},
    4: {title: "title4", text: "text4"}
}
let counter = 5

export async function getAllNotes() {
    await sleep(500)
    const res = []
    for(let key in notes) {
        res.push({id: key, title: notes[key].title, text: notes[key].text})
    }
    return res
}
export async function createNote({title, text}) { // returns result note
    await sleep(500)
    notes[counter] = {title, text}
    counter += 1
    return {id: counter-1, title, text}
}
export async function getNote({id}) {
    await sleep(500)
    let res = null
    res = notes[id]
    counter += 1
    if (!!res)
        return res
    throw "no such id exist"
}
export async function updateNote({id, title, text}) {
    await sleep(500)
    let error = false
    if (notes[id])
        notes[id] = {title, text}
    else
        error = true
    counter += 1
    if(error)
        throw "no such id exist"
    return "ok"
}
export async function deleteNote({id}) {
    await sleep(500)
    let error = false
    if(notes[id])
        notes[id] = undefined
    else
        error = true
    counter += 1
    if(error)
        throw "no such id exist"
    return "ok"
}


// this is dummy backend
let currentUser = null;

// todo remove this
// currentUser = "shayan"

const users = {}
export async function login({username, password}) {
    await sleep(500)
    if(currentUser !== null)
        throw "logout first"
    let ok = true
    ok = (users[username] && users[username] === password)
    if(ok) {
        currentUser = username
        return "ok"
    } else {
        throw "password did not match"
    }
}
export async function register({username, password}) {
    await sleep(500)
    if(currentUser !== null)
        throw "logout first"
    let error = ""
    if(users[username])
        error = "username exists"
    else if(password.length < 4)
        error = "password too short"
    else
        users[username] = password
    if(error) {
        throw error
    } else {
        currentUser = username
        return "ok"
    }
}

export function logout() {
    // erase cookies here
    currentUser = null
}
