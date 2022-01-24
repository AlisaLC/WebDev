import {
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle, Grid,
    TextField, Toolbar
} from "@mui/material";
import {Save as SaveIcon, Close as CloseIcon, Delete as DeleteIcon} from '@mui/icons-material';

import React, {useState} from "react";
import Button from "@mui/material/Button";
import YesNoModal from "./YesNoModal";
import {useRecoilState} from "recoil";
import {notesAtom} from "../state/State";
import {deleteNote as deleteNoteAdapter} from "../state/ApiAdapter"
import ErrorModal from "./ErrorModal";


export default function NoteEditor({onSave:outerSave, onClose, note, setNote}) {
    const [askForDelete, setAskForDelete] = useState(false)
    const [askForSave, setAskForSave] = useState(false)
    const [notes, setNotes] = useRecoilState(notesAtom)
    const [cachedNote, setCachedNote] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorObj, setErrorObj] = useState({hasError: false, lastError: null})

    if(!note) {
        if(askForDelete)
            setAskForDelete(false)
        if(askForSave)
            setAskForSave(false)
        if(cachedNote)
            setCachedNote(null)
        if(isLoading)
            setIsLoading(false)
        return <></>
    }

    const onSave = ()=>{
        setIsLoading(true)
        outerSave(cachedNote, ()=>setIsLoading(false))
    }
    const saveAndClose = ()=>{
        setIsLoading(true)
        outerSave(cachedNote, onClose)
    }
    const updateTitle = (e)=>{
        setCachedNote({...(cachedNote || note), title: e.target.value})
    }
    const updateText = (e)=>{
        setCachedNote({...(cachedNote || note), text: e.target.value})
    }

    const askForDeleteNote = ()=>{
        setAskForDelete(true)
    }
    const askForSaveNote = ()=>{
        setAskForSave(true)
    }
    const closeAskForDeleteModal = () => {
        setAskForDelete(false)
    }
    const closeAskForSaveModal = ()=>{
        setAskForSave(false)
    }
    const deleteNote = ()=> {
        deleteNoteAdapter({id: note.id}, {note, setNote, notes, setNotes})
            .then(onClose)
            .catch(e=>setErrorObj({hasError: true, lastError: e}))
    }
    return (
        <Dialog
            open={!!note}
            onClose={onClose}
            fullScreen
        >
            <DialogTitle>
                <Grid container justifyContent="center" sx={{display: "flex", justifyContent: "center"}}>
                    <TextField
                        label="title"
                        defaultValue={note.title}
                        style={{width: "40%"}}
                        onChange={updateTitle}
                    />
                    <Toolbar>
                        {isLoading ?
                            <CircularProgress/>
                            :
                            <Button variant="contained" onClick={onSave}><SaveIcon/></Button>
                        }
                    </Toolbar>
                    <Toolbar>
                        <Button variant="contained" onClick={askForSaveNote}><CloseIcon/></Button>
                    </Toolbar>
                    <Toolbar>
                        <Button variant="contained" onClick={askForDeleteNote}><DeleteIcon/></Button>
                    </Toolbar>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <TextField multiline
                           minRows={20}
                           defaultValue={note.text}
                           style={{width: "100%", height: "100%"}}
                           onChange={updateText}
                />
            </DialogContent>
            <YesNoModal
                open={askForDelete}
                onYes={deleteNote}
                onNo={closeAskForDeleteModal}
                onClose={closeAskForDeleteModal}
                message={"Are you sure you want to delete this note?"}
            />
            <YesNoModal
                open={askForSave}
                onYes={saveAndClose}
                onNo={onClose}
                onClose={closeAskForSaveModal}
                message={"Do you want to save before closing?"}
            />
            <ErrorModal
                hasError={errorObj.hasError}
                lastError={errorObj.lastError}
                clearErrorObj={()=>setErrorObj({hasError: false, lastError: null})}
            />
        </Dialog>
    );
}