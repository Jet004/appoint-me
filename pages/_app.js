import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import localForage from 'localforage'

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

// Set up date adapter to allow localisation and date functions
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

// Global stylesheet imports
import '../styles/globals.css'

// Initialise UI cache
const clientSideEmotionCache = createEmotionCache()

// This function sets items into indexedDB
const setLocalForage = async (key, value) => {
    try {
        await localForage.setItem(key, value)
    } catch (error) {
        // Let errors propogate if local storage failed to set
    }
}

// This function is used in useEffect to override useState initial values 
// by loading data from indexedDB if present defaults to the initial value 
// if no data is found in local storage
const getLocalForage = async (key) => {
    try {
        const value = await localForage.getItem(key)
        return value
    } catch (error) {
        // If error, keep using initial value
    }
}

// This function checks login status and user type to restrict access to pages
const restrictAccess = (router, loggedIn, userType) => {
    console.log(router.pathname, loggedIn, userType)
    const unauthenticatedUrls = [
        '/',
        '/login',
        '/register',
        '/business-profile/services/[businessId]',
        '/business-profile/appointments/[businessId]',
        '/business-profile/about/[businessId]'
    ]

    const authenticatedUrls = [
        '/home',
        '/calendar',
        '/profile',
        '/business-profile/[businessId]',
        '/business-profile/services/[businessId]',
        '/business-profile/appointments/[businessId]',
        '/business-profile/about/[businessId]'
    ]

    const businessRepUrls = [
        '/business-profile/client-list/[businessId]',
    ]

    // Get URL path from next router
    const path = router.pathname

    // Check if unauthenticated user trying to access a restricted path
    if(!loggedIn && !unauthenticatedUrls.includes(path)) {
        console.log("--> Unauthorised access to:", path)
        router.push('/login')
    }

    // Check if authenticated userType 'user' trying to access a restricted path
    if(loggedIn && userType === 'user' && !authenticatedUrls.includes(path)) {
        console.log("--> Unauthorised access to:", path)
        router.push('/home')
    }

    // Check if authenticated userType 'businessRep' trying to access a restricted path
    if(loggedIn && userType === 'businessRep' && (!authenticatedUrls.includes(path) && !businessRepUrls.includes(path))) {
        console.log("--> Unauthorised access to:", path)
        router.push('/home')
    }
}


// Root component
function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
    // Access next router so we can redirect user
    const router = useRouter()

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
            sessionStorage.setItem('accessToken', '')
            localStorage.setItem('refreshToken', '')
        }
    }}, [user, userType, loggedIn])

    // Get stored data from local storage if available on first render
    useEffect(async () => {
        // Get stored theme mode and set it in state manager
        const storedTheme = await getLocalForage('theme')
        if(storedTheme) {
            setThemeMode(storedTheme)
        }

        // Get stored user data and set it in state manager
        const storedUser = await getLocalForage('userData')
        if(storedUser) {
            setUser(storedUser.user)
            setUserType(storedUser.userType)
            setLoggedIn(storedUser.loggedIn)
        }
    }, [])

    // Persist theme mode to local storage
    useEffect(async () => {
       await setLocalForage('theme', themeMode)
    }, [themeMode])

    // Persist user data to local storage
    useEffect(async () => {
        await setLocalForage('userData', {
            user: user,
            userType: userType,
            loggedIn: loggedIn
        })
    }, [user, userType, loggedIn])


    // Restrict access to pages based on login status and user type
    useEffect(() => {
        const redirect =  restrictAccess(router, loggedIn, userType)
    })


    // This code will change the theme any time themeMode changes
    let theme = useMemo(() => themeMode === 'dark' ? darkTheme(themeMode) : lightTheme(themeMode), [themeMode])

    // Automatically adjust font sizes for text elements based on viewport width
    theme = responsiveFontSizes(theme)

    // Set up timer for periodically checking that the access token is still valid
    useEffect(() => {
        if(UserContext.loggedIn) {
            const timer = setInterval(async () => {
                // Get current timestamp
                const now = Math.floor(Date.now()/1000)

                if(localStorage.getItem('refreshToken')) {
                    // Get refresh token expiry from local storage
                    const refreshToken = localStorage.getItem('refreshToken')
                    const refreshTokenExpiry = JSON.parse(window.atob(refreshToken.split('.')[1])).exp

                    // Check if refresh token is still valid
                    if(now > refreshTokenExpiry){
                        // Refresh token has expired, log user out and redirect to login page
                        console.log('--> Refresh token expired, logging out')
                        UserContext.logout()
                        router.push('/login')
                        // Return to prevent token refresh request
                        return
                    }

                    // Refresh token is still valid, check the access token
                    if(sessionStorage.getItem('accessToken')) {
                        // Get access token expiry from session storage
                        const accessToken = sessionStorage.getItem('accessToken')
                        const accessTokenExpiry = JSON.parse(window.atob(accessToken.split('.')[1])).exp
                        
                        // Check if access token is still valid
                        if((accessTokenExpiry - 60) > now){
                            // Access token is still valid, return to prevent token refresh
                            return
                        }

                        // Access token will expire but refresh token is still valid, perform token refresh
                        try {
                            console.log(`Attempting to refresh tokens at ${new Date()}`)
                            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/token-refresh`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${accessToken}`
                                },
                                body: JSON.stringify({refreshToken: refreshToken})
                            })
                            const data = await response.json()
                            
                            // Check for 400 response
                            if(response.status === 400) {
                                // Either there was a validation error, the refresh token has expired 
                                // or the refresh token is invalid. Log user out and redirect to login page\
                                console.log("--> failed to refresh token with status [400]")
                                UserContext.logout()
                                router.push('/login')
                            }

                            // Throw error if response failed
                            if(!response.ok) {
                                throw {
                                    status: response.status,
                                    message: data.message,
                                }
                            }

                            // Request was successful, persist new tokens in browser storage
                            sessionStorage.setItem('accessToken', data.accessToken)
                            localStorage.setItem('refreshToken', data.refreshToken)  
                            console.log("--> Token refresh successful")
                            // Return to prevent redirect
                            return
    
                        } catch (error) {
                            // Log error to console
                            console.log(`[${error.status}] ${error.message}`)
                        }
                    }
                    // No access token but refresh token is still valid. Suspicious activity, log user out
                }

                // No refresh token, log user out and redirect to login page
                console.log("--> No refresh token found, user logged out")
                UserContext.logout()
                router.push('/login')
            }, 5000)
        }

        // Remove the time when component unmounts to avoid memory leaks
        return () => clearInterval(timer)
    }, [UserContext])

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
