import { createTheme } from '@mui/material/styles'

const darkTheme = (mode) => createTheme({
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
        background: {
            // default: '#2b262c',
            // paper: '#2b262c'
        },
        text: {
            custom: {
                red: "#9A030D"
            }
        },
        gradients: {
            lightWhite: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))"
        },
        custom: {
            contrastText: "#bbb",
            action: {
                selected: {
                    color: '#fff',
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
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))"
                }
            }
        },
        MuiBottomNavigationAction: {
            root: {
                color: 'custom.action.hover',
                '&:hover': {
                    color: "#bbb"
                }
            }
        }
    }
})

export default darkTheme