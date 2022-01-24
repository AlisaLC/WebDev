import {AppBar, Box, Stack, Toolbar, Typography, Button} from "@mui/material";
import {ThemeSwitch} from "./ThemeSwitch";
import {usernameAtom} from "../state/State";
import {useRecoilState} from "recoil";
import {Link as RouterLink} from 'react-router-dom'
import {logout, updateUsernameIfChanged} from "../state/ApiAdapter";

import Cookies from 'js-cookie';
import {login} from '../api/api';


export default function Navbar({theme, toggleCallback}) {
    const [username, setUsername] = useRecoilState(usernameAtom)
    updateUsernameIfChanged({username, setUsername})
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Box sx={{ display: "flex", justifyContent: 'space-between'}}>
                    {username ?
                        <Toolbar>
                            <Typography variant="h5" sx={{p: 2}}>
                                Welcome {username}!
                            </Typography>
                            <Button variant="contained" onClick={()=>logout({username, setUsername})}>Logout</Button>
                        </Toolbar>
                        :
                        <Toolbar>
                            <Button variant="contained" component={RouterLink} sx={{p: 2, m:1}} to="/login">Login</Button>
                            <Button variant="contained" component={RouterLink} sx={{p: 2, m:1}} to="/register">Register</Button>
                        </Toolbar>
                    }


                    {/* todo remove this after debug*/}
                    <Toolbar>
                        <Button variant="contained" sx={{p: 2, m:1}} onClick={()=> {
                            login({username: "Shayan", password: "Pardis"}).then(console.log)
                        }}>SHIT FOR DEBUG</Button>
                    </Toolbar>


                    <Toolbar>
                        <ThemeSwitch
                            value="check"
                            checked={theme === "dark"}
                            onChange={toggleCallback}
                        />
                    </Toolbar>
                </Box>
            </AppBar>
        </Box>
    )
}
