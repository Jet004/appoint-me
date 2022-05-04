import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import userContext from '../utility/appContext'


// Components
import Footer from '../components/footer'
import Header from '../components/header/header'
import NavMenu from '../components/nav-menu'

const Layout = ({ page, children }) => {
    // GET USER DATA FOR PROTOTYPE
    const userData = useContext(userContext)

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

            {userData.loggedIn && (
                <NavMenu  windowWidth={windowWidth} />
            )}
            <Footer />
        </>
    )
}

export default Layout
