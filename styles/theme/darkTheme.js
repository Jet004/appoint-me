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
        contrast: {
            main: "#bbb",
        },
        text: {
            custom: {
                red: "#9A030D",
                secondary: "#026258",
                warning: "#FA9F42",
                theme: "#121212",
                hightlight: "#2a2a2a"
            }
        },
        custom: {
            contrastText: "#bbb",
            primaryContrastText: "#bbb",
            contrastTextStrong: "#e1e1e1",
            contrastTextLight: "#666",
            red: "#9A030D",
            secondary: "#026258",
            warning: "#FA9F42",
            theme: "#121212",
            light: "rgba(255, 255, 255, 0.1)",
            highlight: "#2a2a2a",
            gradient: {
                lighter: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                light: "linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))",
                medium: "linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15))",
                dark: "linear-gradient(rgba(80, 80, 80, 0.5), rgba(80, 80, 80, 0.5))",
                lift: "linear-gradient(rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.08))",
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
        // MuiBottomNavigation: {
        //     styleOverrides: {
        //         root: {
        //             backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))"
        //         }
        //     }
        // },
        // MuiBottomNavigationAction: {
        //     root: {
        //         color: 'custom.action.hover',
        //         '&:hover': {
        //             color: "#bbb"
        //         }
        //     }
        // }
    }
})

export default darkTheme