const getDesignTokens = (mode) => ({
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
    }
}

const lightThemePalette = {
    // Light mode palette
    custom: {
        contrastText: "#fff"
    }
}