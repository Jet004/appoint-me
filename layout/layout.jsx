import React from 'react'
import Head from 'next/head'

// Theme and UI imports
import { Container } from '@mui/material'

// Components
import Header from '../components/header/header'
import NavMenu from '../components/nav-menu'

const Layout = ({ page, children }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <Header page={page} />
            { children }
            <NavMenu  />
        </>
    )
}

export default Layout

const styles = {
    layout: {
        navMenu: {
            display: { xs: 'flex', md: 'none'}
        }
    }
}