import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#2b262c',
            paper: '#2b262c'
        },
    }
})

export default darkTheme