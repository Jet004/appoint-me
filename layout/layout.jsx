import React, { useState, useEffect } from 'react'
import Head from 'next/head'

// Theme and UI imports


// Components
import Header from '../components/header/header'
import NavMenu from '../components/nav-menu'

const Layout = ({ page, children }) => {

    // Listen for screen resize to determine which components to render
    const [windowWidth, setWindowWidth] = useState(false)
    
    useEffect(() => {
        const updateMedia = () => setWindowWidth(window.innerWidth)
        updateMedia()
        window.addEventListener('resize', updateMedia)
        return () => window.removeEventListener('resize', updateMedia)
    }, [])
    
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <Header page={page} windowWidth={windowWidth} />
            { children }
            <NavMenu  windowWidth={windowWidth} />
        </>
    )
}

export default Layout
