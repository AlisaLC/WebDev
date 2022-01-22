import {Box, Button, CircularProgress, Grid, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useEffect, useState} from "react";
import NotePreview from '../components/NotePreview'
import NoteEditor from "../components/NoteEditor";
import {createNote, getAllNotes, updateNote} from "../api/api";

function renderPreviewList(notes, setActiveNote) {
    if (notes && notes.length > 0) {
        return <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'space-evenly'}}>
            {
                notes.map(x=>
                    <Grid item>
                        <NotePreview title={x.title} text={x.text} key={x.id} onOpen={()=>setActiveNote(x)}/>
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
    const [notes, setNotes] = useState(null)
    const [activeNote, setActiveNote] = useState(null)

    useEffect(()=>{
        getAllNotes().then(res=>setNotes(res))
    }, [])

    const addNewNote = () => {
        createNote({title: 'Untitled', text: ""}).then(res=>{
            setNotes([...notes, res])
        })
    }
    const onSaveActiveNote = (callback) => {
        updateNote(activeNote).then(callback)
    }

    const onCloseActiveNote = () => {
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
            {!!activeNote ? <NoteEditor open={true} note={activeNote} onSave={onSaveActiveNote} onClose={onCloseActiveNote}/> : null}
        </>
    )
}