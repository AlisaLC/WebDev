import {Box, Button, CircularProgress, Grid, Slide, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import React, {useEffect, useRef, useState} from "react";
import NotePreview from '../components/NotePreview'
import NoteEditor from "../components/NoteEditor";
import {createNote, getAllNotes, updateNote} from "../state/ApiAdapter";
import {notesAtom} from "../state/State";
import {useRecoilState} from "recoil";
import ErrorModal from "../components/ErrorModal";

function renderPreviewList(notes, setActiveNote) {
    if (notes && notes.length > 0) {
        return <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'space-evenly'}}>
            {
                notes.map(x=>
                    <Grid item key={x.id}>
                        <NotePreview title={x.title} text={x.text} onOpen={()=>setActiveNote(x)}/>
                    </Grid>
                )
            }
        </Grid>
    } else if(notes !== null) {
        return  <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{mt: 3}}>
                    <Typography variant="h5" fontWeight="bold">No notes to show!</Typography>
                </Grid>
    } else {
        return <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <CircularProgress />
        </Box>
    }
}

export default function NotePage() {
    const [notes, setNotes] = useRecoilState(notesAtom)
    const [activeNote, setActiveNote] = useState(null)
    const [errorObj, setErrorObj] = useState({hasError: false, lastError: null})

    useEffect(()=>{
        getAllNotes({notes, setNotes})
            .catch(e=>setErrorObj({hasError: true, lastError: e}))
    }, [])

    const addNewNote = () => {
        createNote({title: 'Untitled', text: ""}, {notes, setNotes})
            .catch(e=>setErrorObj({hasError: true, lastError: e}))
    }

    const onSaveActiveNote = (note, callback) => {
        if(note !== null)
            updateNote(note, {note: activeNote, setNote: setActiveNote, notes, setNotes})
                .then(callback)
                .catch(e=>setErrorObj({hasError: true, lastError: e}))
        else if(callback)
            callback()
    }

    const onCloseActiveNote = () => {
        setActiveNote(null)
    }

    if(activeNote !== null && !notes.find(e => e.id === activeNote.id)) {
        setActiveNote(null)
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', pb:2}}>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mr: 3 }}
                    startIcon={<Add/>}
                    onClick={addNewNote}
                    >
                    New Note!
                </Button>
            </Box>
            {renderPreviewList(notes, setActiveNote)}
            <NoteEditor open={!!activeNote} note={activeNote} setNote={setActiveNote} onSave={onSaveActiveNote} onClose={onCloseActiveNote}/>
            <ErrorModal
                hasError={errorObj.hasError}
                lastError={errorObj.lastError}
                clearErrorObj={()=>setErrorObj({hasError: false, lastError: null})}
            />
        </>
    )
}