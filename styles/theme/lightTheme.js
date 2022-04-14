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
        background: {
            default: "#f5f5f5",
            paper: "#f5f5f5",
            transparent: "rgba(240, 240, 240, 0.7)",
        },
        text: {
            custom: {
                red: "#9A030D",
                icon: "#ddd",
            }
        },
        custom: {
            contrastText: "#666",
            primaryContrastText: "#666",
            contrastTextStrong: "#333",
            gradient: {
                lighter: "linear-gradient(rgba(0, 0, 0, 0.025), rgba(0, 0, 0, 0.025))",
                light: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))",
                medium: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))",
                iconBackground: "linear-gradient(rgba(150, 150, 150, 0.8), rgba(150, 150, 150, 0.8))",
            },
            action: {
                selected: {
                    color: '#333',
                    // fontWeight: "bold"
                },
                hover: '#222',
                cardHover: {
                    color: '#333',
                    borderColor: '#333',
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))",
                },
            }
        
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    components: {
        // MuiBottomNavigation: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: "#1976d2"
        //         }
        //     }
        // },
        // MuiBottomNavigationAction: {
        //     root: {
        //         color: 'custom.action.hover',
        //         '&:hover': {
        //             color: "#fff"
        //         }
        //     }
        // }
    }
})

export default lightTheme