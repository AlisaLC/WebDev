import {
    Box,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid, IconButton,
    Paper,
    Slide,
    TextareaAutosize, TextField, Toolbar
} from "@mui/material";
import {Save as SaveIcon, Close as CloseIcon} from '@mui/icons-material';

import React, {useRef, useState} from "react";
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";


export default function NoteEditor({open, onSave, onClose, note}) {
    // add saving option

    const titleNode = useRef(null)
    const textNode = useRef(null)

    const Transition = React.forwardRef((props,ref) =>
        <Slide direction="up" ref={ref} {...props}/>
    )
    const saveAndClose = ()=>{
        onSave(onClose)
    }

    const updateTitle = (e)=>{
        note.title = e.target.value
    }
    const updateText = (e)=>{
        note.text = e.target.value
        console.log(e.target.value, e.target, e)
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen
            TransitionComponent={Transition}
        >
            <DialogTitle>
                <Grid container justifyContent="center" sx={{display: "flex", justifyContent: "center"}}>
                    <TextField
                        label="title"
                        defaultValue={note.title}
                        style={{width: "40%"}}
                        ref={titleNode}
                        onChange={updateTitle}
                    />
                    <Toolbar>
                        <Button variant="contained" onClick={onSave}><SaveIcon/></Button>
                    </Toolbar>
                    <Toolbar>
                        <Button variant="contained" onClick={saveAndClose}><CloseIcon/></Button>
                    </Toolbar>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <TextField multiline
                           minRows={20}
                           enableScroll={true}
                           defaultValue={note.text}
                           style={{width: "100%", height: "100%"}}
                           ref={textNode}
                           onChange={updateText}
                />0
            </DialogContent>
        </Dialog>
    );
}