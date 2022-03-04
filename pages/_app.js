import React, { useMemo, useState } from 'react'

// Theme and UI imports
import { CacheProvider, cacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import createEmotionCache from '../utility/emotionCache'
// Get the global context for theme switch - This allows any child component
// to access the theme switch via React.useContext() and avoids the need to
// pass values through props
import ThemeContext from '../utility/themeContext'
// Design tokens are the custom declaration of theme values for the light and
// dark themes
import darkTheme from '../styles/theme/darkTheme'
import lightTheme from '../styles/theme/lightTheme'

// Import user context data - WILL CHANGE!!!
import userDataContext from '../utility/mockData/userDataContext'
import * as user from '../utility/mockData/userContext'
import * as businessUser from '../utility/mockData/businessContext'

// Global stylesheet imports
import '../styles/globals.css'

// Initialise UI cache
const clientSideEmotionCache = createEmotionCache()

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
    // Theme switch state to toggle dark/light mode
    const [themeMode, setThemeMode] = useState('dark')
    // Theme toggler logic
    const colourMode = {
        toggleColourMode: () => {
            setThemeMode(prev => prev === 'light' ? 'dark' : 'light')
        }
    }

    // Set up user context - THIS WILL CHANGE IN NEXT ITERATION
    const [userType, setUserType] = useState('user')

    const userMode = useMemo(() => {
        const User = userType === 'user' ? user : businessUser
        return {
        type: userType,
        user: User.users[0],
        getUsers: User.getUsers,
        getUserByID: User.getUserById,
        createUser: User.createUser,
        updateUser: User.updateUser,
        toggleUserType: () => {
            setUserType(prev => prev === 'user' ? 'business' : 'user')
        }
    }}, [userType])


    // This code will change the theme colours any time themeMode changes
    let theme = useMemo(() => themeMode === 'dark' ? darkTheme(themeMode) : lightTheme(themeMode), [themeMode])
    // createTheme(getDesignTokens(themeMode))
    // Automatically adjust font sizes for text elements based on viewport width
    theme = responsiveFontSizes(theme)

    return (
        <CacheProvider value={emotionCache}>
            <ThemeContext.Provider value={colourMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <userDataContext.Provider value={userMode}>
                        <Component {...pageProps} />
                    </userDataContext.Provider>
                </ThemeProvider>
            </ThemeContext.Provider>
        </CacheProvider>
    )
}

export default MyApp