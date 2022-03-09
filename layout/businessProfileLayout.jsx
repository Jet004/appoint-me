import React from 'react'

// Next.js imports
import Head from 'next/head'

// Styles, UI, UX
import { useTheme } from '@mui/material/styles'
import CustomImage from '../components/custom-image'
import Box from '@mui/material/Box'
import Layout from './layout'
import Link from '../components/link'

// Images
import logoDark from '../public/images/logo/logo_dark.png'
import logoLight from '../public/images/logo/logo.png'
import thumbDark from '../public/images/logo/thumbnail_dark.png'
import thumbLight from '../public/images/logo/thumbnail.png'


export default function BusinessProfileLayout({ logo, title, children }) {
    const theme = useTheme()
    let imgSrc
    if(logo === "full") theme.palette.mode === "dark" ? imgSrc = logoDark : imgSrc = logoLight
    if(logo === "thumb") theme.palette.mode === "dark" ? imgSrc = thumbDark : imgSrc = thumbLight
    const logoAvatar = logo === "full" ? styles.logoFull : styles.logoThumb

    const headTitle = title === "" ? "" : `: ${title}`
    return (
        <Layout page=" ">
            <Head>
                <title>{`AppointMe${headTitle}`}</title>
            </Head>

            <Box>
                <Link sx={styles.logoBox} href="/">
                    <CustomImage variant="square" style={logoAvatar} src={imgSrc} alt="Logo" />
                </Link>
            </Box>
            <Box sx={styles.contentBox}>
                { children }
            </Box>
        </Layout>
    )
}


const styles = {
    logoBox: {
        mt: {xs: 6, md: 10},
        width: "100%", 
        display: "flex", 
        justifyContent: "center"
    },
    logoFull: {
        width: "65%",
        maxWidth: 400,
        height: "auto"
    },
    logoThumb: {
        width: "30%",
        maxWidth: 150,
        height: "auto"
    },
    contentBox: {
        mt: {xs: 4, md: 8},
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
}