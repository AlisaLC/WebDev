import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Paper, Typography} from "@mui/material";

function shorten(str, len) {
    if(str.length > len) {
        str = str.substr(0, len) + "..."
    }
    return str
}

export default function NotePreview({title, text, onOpen}) {
    title = shorten(title, 15)
    text = shorten(text, 200)
    return (
        <Card sx={{ minWidth: 200, minHeight: 250, maxWidth: 200 }}>
            <CardContent sx={{height: "100%", p: 1, color:"background.paperSec"}}>
                <CardActionArea onClick={onOpen}>
                    <Paper sx={{mb: 4}}>
                        <Typography noWrap variant="h6" color="text.secondary" sx={{display: "flex", justifyContent: "center"}}>
                            {title}
                        </Typography>
                    </Paper>
                </CardActionArea>
                <Typography variant="body2" sx={{display: "flex", justifyContent: "center"}} style={{wordBreak: "break-word"}}>
                    {text}
                </Typography>
            </CardContent>
        </Card>
    );
}