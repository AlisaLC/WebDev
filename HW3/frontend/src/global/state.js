import {
    atom, selector,
} from 'recoil';

export const themeAtom = atom({
    key: "theme",
    default: "dark"
});

export const notesAtom = atom({
    key: "notes",
    default: []
})

export const usernameAtom = atom({
    key: "username",
    default: null
    // default: "Shayan" // todo make this null
})

export const isLoggedInSelector = selector({
    key: 'isLoggedIn',
    get: ({get}) => {
        const username = get(usernameAtom)
        return !!username
    },
})

export function logout({username, setUsername}) {
    setUsername(null)
}

export function toggleTheme({theme, setTheme}) {
    setTheme(theme === "light" ? "dark" : "light")
}