const getDesignTokens = (mode) => ({
    breakpoints: {
        values: {
            sm: 620
        }
    },
    palette: {
        mode: mode,
        ...(mode === 'light' ? lightThemePalette : darkThemePalette),
        contrastThreshold: 3,
        tonalOffset: 0.2,
        
    }
})

export default getDesignTokens

const darkThemePalette = {
    // Dark mode palette
    background: {
        default: '#2b262c',
        paper: '#2b262c'
    },
    text: {
        custom: {
            red: "#9A030D"
        }
    },
    custom: {
        contrastText: "#bbb",
        action: {
            selected: {
                color: '#fff',
            },
            hover: '#fff'
        }
    }
}

const lightThemePalette = {
    // Light mode palette
    custom: {
        contrastText: "#ddd",
        action: {
            selected: {
                color: '#fff',
                fontWeight: "bold"
            },
            hover: '#fff'
        }
    
    }
}