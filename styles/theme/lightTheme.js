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
            default: "#fff",
            paper: "#fff",
            transparent: "rgba(245, 245, 245, 0.6)",
        },
        text: {
            custom: {
                red: "#9A030D",
                secondary: {
                    main: "rgb(56, 118, 208)",
                    medium: "rgb(166, 204, 242)",
                    light: "rgb(201, 224, 247)",
                },
                warning: "#FA9F42",
                theme: "#fff",
                highlight: "#e4e4e4",
                icon: "#ddd",
            }
        },
        custom: {
            contrastText: "#666",
            primaryContrastText: "#555",
            contrastTextStrong: "#2b2b2b",
            contrastTextLight: "#999",
            red: "#9A030D",
            secondary: {
                main: "rgba(56, 118, 208, 1)",
                medium: "rgba(166, 204, 242, 1)",
                light: "rgba(201, 224, 247, 1)",
            },
            warning: "#FA9F42",
            theme: "#fff",
            highlight: "#e4e4e4",
            icon: "#ddd",
            gradient: {
                lighter: "linear-gradient(rgba(0, 0, 0, 0.025), rgba(0, 0, 0, 0.025))",
                light: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))",
                medium: "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))",
                white: "linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))",
                secondary: {
                    main: "linear-gradient(rgba(66, 128, 218, 1), rgba(36, 98, 188, 1))",
                    medium: "linear-gradient(rgba(166, 204, 242, 1), rgba(166, 204, 242, 1))",
                    light: "linear-gradient(rgba(201, 224, 247, 1), rgba(201, 224, 247, 1))",
                },
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
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    filter: "drop-shadow(2px 2px 2px rgb(0 0 0 / 0.3))",
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    filter: "drop-shadow(2px 2px 2px rgb(0 0 0 / 0.3))",
                }
            }
        }
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