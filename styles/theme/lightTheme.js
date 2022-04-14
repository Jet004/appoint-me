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
            default: "#eaeaea",
            paper: "#eaeaea",
            transparent: "rgba(240, 240, 240, 0.7)",
        },
        text: {
            custom: {
                red: "#9A030D",
                secondary: "#026258",
                warning: "#FA9F42",
                theme: "#eaeaea",
                highlight: "#dadada",
                icon: "#ddd",
            }
        },
        custom: {
            contrastText: "#555",
            primaryContrastText: "#555",
            contrastTextStrong: "#2b2b2b",
            contrastTextLight: "#999",
            red: "#9A030D",
            secondary: "#026258",
            warning: "#FA9F42",
            theme: "#eaeaea",
            highlight: "#dadada",
            icon: "#ddd",
            gradient: {
                lighter: "linear-gradient(rgba(0, 0, 0, 0.025), rgba(0, 0, 0, 0.025))",
                light: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))",
                medium: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))",
                lift: "linear-gradient(rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.15))",
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