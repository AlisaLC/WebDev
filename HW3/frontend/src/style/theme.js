import {createTheme} from "@mui/material";
import {orange, purple, green} from "@mui/material/colors";

// todo. fix colors

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#d47e74',
            light: '#797b7b',
            dark: '#8f3127',
        },
        secondary: {
            main: '#4e4e4e',
            light: '#717171',
            dark: '#4E4E4E',
            contrastText: '#eae9e9',
        },
        background: {
            paper: '#eaaa93',
            paperSec: '#e88c70',
            default: '#e5dc97',
        },
        text: {
            primary: 'rgba(20,20,20,0.87)',
            secondary: '#b17474',
        },
    },
    typography: {
        fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
    },
    components: {
        Link: {
            underline: "hover",
            color: green
        }
    },
    spacing: 8
})

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#4b46ce',
            light: '#2f68b4',
            dark: '#1a6161',
        },
        secondary: {
            main: '#606060',
            light: '#101010',
            dark: '#000000',
        },
        divider: 'rgba(243,241,241,0.12)',
        background: {
            paper: '#4f5354',
            paperSec: '#898f8f',
            default: '#202124',
        },
        text: {
            secondary: '#a2b8ef',
            primary: '#70b6ef',
            disabled: 'rgba(16,135,199,0.5)',
        },
    },
    typography: {
        fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
    },
    components: {
        Link: {
            underline: "hover",
            color: green
        }
    },
    spacing: 8
})
