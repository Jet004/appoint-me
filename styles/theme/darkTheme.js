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
        custom: {
            contrastText: "#bbb",
            primaryContrastText: "#bbb",
            contrastTextStrong: "#fff",
            gradient: {
                lighter: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                light: "linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))",
                medium: "linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15))",
                iconBackground: "linear-gradient(rgba(120, 120, 120, 0.6), rgba(120, 120, 120, 0.6))",
            },
            action: {
                selected: {
                    color: '#fff',
                },
                hover: '#fff',
                cardHover: {
                    color: '#fff',
                    borderColor: '#fff',
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15))",
                },
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