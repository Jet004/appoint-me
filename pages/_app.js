import React, { useEffect, useMemo, useState } from 'react'

// Theme and UI imports
import { CacheProvider, cacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { responsiveFontSizes } from '@mui/material/styles'
import createEmotionCache from '../utility/emotionCache'
// Get the global context for theme switch - This allows any child component
// to access the theme switch via React.useContext() and avoids the need to
// pass values through props
import ThemeContext from '../utility/themeContext'
import darkTheme from '../styles/theme/darkTheme'
import lightTheme from '../styles/theme/lightTheme'

// Import user context data - WILL CHANGE!!!
import userContext from '../utility/mockData/appContext'
import * as user from '../utility/mockData/userData'
import * as businessUser from '../utility/mockData/businessContext'

// Set up date adapter to allow localisation and date functions
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

// Global stylesheet imports
import '../styles/globals.css'

// Initialise UI cache
const clientSideEmotionCache = createEmotionCache()

// This function sets items into local storage
const setLocalStorage = (key, value) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        // Let errors propogate if local storage failed to set
    }
}

// This function wraps useState initial values to load data from local storage if present
// defaults to an initial value if no data is found in local storage
const getLocalStorage = (key) => {
    try {
        const value = window.localStorage.getItem(key)
        return JSON.parse(value)
    } catch (error) {
        // If error, keep using initial value
    }
}

// Root component
function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
    // Theme switch state to toggle dark/light mode
    const [themeMode, setThemeMode] = useState("dark")
    // Theme toggler logic
    const colourMode = {
        toggleColourMode: () => {
            setThemeMode(prev => prev === 'light' ? 'dark' : 'light')
        }
    }
    

    // Set up user context - THIS WILL CHANGE IN NEXT ITERATION
    const [userType, setUserType] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({})

    // Set user context to draw from app level state
    const UserContext = useMemo(() => {
        return {
        loggedIn: loggedIn,
        userType: userType,
        user: user,
        login: (userData, userTypeData) => {
            setUser(userData)
            setUserType(userTypeData)
            setLoggedIn(true)
        },
        update: (userData) => {
            setUser((prev) => ({...prev, ...userData}))
        },
        logout: () => {
            setLoggedIn(false)
            setUser({})
            setUserType(null)
        }
    }}, [user, userType, loggedIn])

    // Get stored data from local storage if available on first render
    useEffect(() => {
        // Get stored theme mode and set it in state manager
        const storedTheme = getLocalStorage('theme')
        if(storedTheme) {
            setThemeMode(storedTheme)
        }

        // Get stored user data and set it in state manager
        const storedUser = JSON.parse(getLocalStorage('userData'))
        if(storedUser) {
            setUser(storedUser.user)
            setUserType(storedUser.userType)
            setLoggedIn(storedUser.loggedIn)
        }
    }, [])

    // Persist theme mode to local storage
    useEffect(() => {
       setLocalStorage('theme', themeMode)
    }, [themeMode])

    // Persist user data to local storage
    useEffect(() => {
        setLocalStorage('userData', JSON.stringify({
            user: user,
            userType: userType,
            loggedIn: loggedIn
        }))
    }, [user, userType, loggedIn])


    // This code will change the theme any time themeMode changes
    let theme = useMemo(() => themeMode === 'dark' ? darkTheme(themeMode) : lightTheme(themeMode), [themeMode])

    // Automatically adjust font sizes for text elements based on viewport width
    theme = responsiveFontSizes(theme)

    return (
        <CacheProvider value={emotionCache}>
            <ThemeContext.Provider value={colourMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <userContext.Provider value={UserContext}>
                            <Component {...pageProps} />
                        </userContext.Provider>
                    </LocalizationProvider>
                </ThemeProvider>
            </ThemeContext.Provider>
        </CacheProvider>
    )
}

export default MyApp
