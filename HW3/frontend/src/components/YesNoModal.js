import {Box, Modal} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import Typography from "@mui/material/Typography";

export default function YesNoModal({open, message, onYes, onNo, onClose}) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {message}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Button variant="contained" color="warning" onClick={onYes}>Yes</Button>
                    <Button variant="contained" color="secondary" onClick={onNo}>No</Button>
                </Typography>
            </Box>
        </Modal>
    )
}