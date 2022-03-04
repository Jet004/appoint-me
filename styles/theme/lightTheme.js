import { createTheme } from '@mui/material/styles'

const lightTheme = (mode) => createTheme({
    breakpoints: {
        values: {
            sm: 620
        }
    },
    palette: {
        mode: mode,
        text: {
            custom: {
                red: "#9A030D"
            }
        },
        custom: {
            contrastText: "#ddd",
            action: {
                selected: {
                    color: '#fff',
                    fontWeight: "bold"
                },
                hover: '#fff'
            }
        
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    components: {
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    backgroundColor: "#1976d2"
                }
            }
        }
    }
})

export default lightTheme