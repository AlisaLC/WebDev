import * as API from '../api/api';
import Cookies from 'js-cookie'

export function getAllNotes({notes, setNotes}) {
    return API.getAllNotes()
        .then(res=>setNotes(res))
}
export function createNote({title, text}, {notes, setNotes}) {
    return API.createNote({title, text})
        .then(res=>setNotes([res].concat(notes)))
}
export function getNote({id}, {note, setNote}) {
    return API.getNote({id})
        .then(res=>setNote(res))
}
export function updateNote({id, title, text}, {note, setNote, notes, setNotes}) {
    return API.updateNote({id, title, text})
        .then(res=>{
            let newNote = {id, title, text}
            setNote(newNote);
            setNotes([newNote].concat(notes.filter(e => e.id !== id)))
        })
}
export function deleteNote({id}, {note, setNote, notes, setNotes}) {
    return API.deleteNote({id})
        .then(res=>{
            setNotes(notes.filter(e => e.id !== id))
            setNote(null);
        })
}

export function login({username, password}, {oldUsername, setUsername}) {
    return API.login({username, password})
        .then(res=>updateUsernameIfChanged({oldUsername, setUsername}))
}
export function register({username, password}, {oldUsername, setUsername}) {
    return API.register({username, password})
        .then(res=>updateUsernameIfChanged({oldUsername, setUsername}))
}
export function logout({username, setUsername}) {
    API.logout()
    updateUsernameIfChanged({username, setUsername})
}
export function updateUsernameIfChanged({username, setUsername}) {
    // todo is this connected to every where?
    const cUsername = Cookies.get('username') || null
    const rUsername = username || null
    console.log(cUsername, " ***** ", rUsername, "===== ", username)
    if(cUsername !== rUsername) {
        console.log("WE SET USERNAME!! ")
        setUsername(cUsername)
    }
}