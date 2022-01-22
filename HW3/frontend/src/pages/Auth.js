import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {login, register} from "../api/api"
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {Alert, IconButton, Link, Snackbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {usernameAtom} from "../global/state";
import {useRecoilState} from "recoil";

function renderLoginRegisterForm(isLogin, {errorMessage, handleSubmit, onCloseError}) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        onCloseError()
    };
    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
        <CloseIcon fontSize="small" />
        </IconButton>
    );

    return <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {isLogin ? "Login" : "Register"}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {isLogin ? "Login" : "Register"}
                </Button>
                <Grid container>
                    <Grid item>
                        {isLogin ?
                            <Typography><Link to="/register" component={RouterLink}>
                                Don't have an account? Register!
                            </Link></Typography>
                            :
                            <Typography><Link to="/login" component={RouterLink}>
                                Already have an account? Login!
                            </Link></Typography>
                        }
                    </Grid>
                </Grid>
            </Box>
        </Box>
        <Snackbar open={!!errorMessage} autoHideDuration={5000} onClose={handleClose} action={action}>
            <Alert severity="error" action={action}>{errorMessage}</Alert>
        </Snackbar>
    </Container>
}

export function LoginPage() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useRecoilState(usernameAtom)
    const handleSubmit = (event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        login({username: data.get("username"), password: data.get("password")})
            .then(()=> {
                setUsername(data.get("username"))
                navigate("/notes")
            })
            .catch(e=>setErrorMessage(e))
    });
    const onCloseError = ()=>setErrorMessage(null)
    return renderLoginRegisterForm(true, {handleSubmit, errorMessage, onCloseError})
}


export function RegisterPage() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useRecoilState(usernameAtom)
    const handleSubmit = (event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        register({username: data.get("username"), password: data.get("password")})
            .then(res=> {
                setUsername(data.get("username"))
                navigate("/notes")
            })
            .catch(e=>setErrorMessage(e))
    });
    const onCloseError = ()=>setErrorMessage(null)
    return renderLoginRegisterForm(false, {handleSubmit, errorMessage, onCloseError})
}
