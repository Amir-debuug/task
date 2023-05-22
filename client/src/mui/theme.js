import { createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            main: '#fff'
        },
        secondary: {
            main: '#E55735'
        },
        gray: {
            main: '#808080'
        },
        success: {
            main: '#808080'
        }
    },
    typography: {
        button: {
            textTransform: 'none',
        },
    }
})

export default theme;