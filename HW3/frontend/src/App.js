import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import "./App.css"
import HomePage from "./pages/HomePage";
import NotePage from "./pages/NotePage";
import {LoginPage, RegisterPage} from "./pages/Auth"

import {CssBaseline, ThemeProvider} from "@mui/material";
import { lightTheme, darkTheme } from './style/theme'
import Navbar from "./components/Navbar";

import React from 'react';
import {
    useRecoilValue,
    useRecoilState
} from 'recoil';

import {isLoggedInSelector, themeAtom, toggleTheme} from './state/State'
import {ParticleComponent} from "./components/Particles";


function authNode(node, isLoggedIn, shouldLoggedIn) {
    if(shouldLoggedIn)
        return isLoggedIn ? node : <Navigate to="/login" />
    else
        return isLoggedIn ? <Navigate to="/" /> : node
}

export default function App() {
    const [theme, setTheme] = useRecoilState(themeAtom)
    const isLoggedIn = useRecoilValue(isLoggedInSelector)
    const themeObj = theme === "light" ? lightTheme : darkTheme;
    return (
        <ThemeProvider theme={themeObj}>
             <CssBaseline/>
             <Router>
                 <Navbar theme={theme} toggleCallback={()=>toggleTheme({theme, setTheme})}/>
                 <ParticleComponent theme={themeObj} />
                 <Routes>
                     <Route path="/" element={<HomePage />}/>
                     <Route path="/login" element={authNode(<LoginPage/>, isLoggedIn, false)}/>
                     <Route path="/register" element={authNode(<RegisterPage/>, isLoggedIn, false)}/>
                     <Route path="/notes" element={authNode(<NotePage/>, isLoggedIn, true)}/>
                 </Routes>
             </Router>
        </ThemeProvider>
      );
}
