import { createTheme } from '@mui/material/styles'

const lightTheme = (mode) => createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 620,
            md: 900,
            lg: 1200,
            xl: 1536
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
        },
        MuiBottomNavigationAction: {
            root: {
                color: 'custom.action.hover',
                '&:hover': {
                    color: "#fff"
                }
            }
        }
    }
})

export default lightTheme