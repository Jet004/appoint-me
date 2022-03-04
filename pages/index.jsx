import React from 'react'
// ONLY NEEDED FOR PROTOTYPE
import { useRouter } from 'next/router'

// Next.js imports
import Head from 'next/head'

// Styles, UI, UX
import { Typography } from '@mui/material'
import CustomImage from '../components/custom-image'
import Box from '@mui/material/Box'
import ServiceCard from '../components/serviceCard/serviceCard'
import Link from '../components/link'

import { serviceData } from '../components/serviceCard/serviceCardData'

// Images
import logoDark from '../public/images/logo/logo_dark.png'


export default function Index() {
    // ROUTER FOR PROTOTYPE FILTER
    const router = useRouter()
    // THIS WILL CHANGE IN NON-PROTOTYPE VERSION
    // Filter service card data based on login status
    const data = serviceData.filter((item) => item.title !== 'makeAppointment' )
    console.log(data)

    return (
        <>
            <Head>
                <title>AppointMe</title>
            </Head>
            <Box sx={styles.logoBox}>
                <CustomImage style={styles.logoAvatar} src={logoDark} alt="Logo" />
            </Box>
            <Box sx={styles.contentBox}>
                <Box sx={styles.innerBox}>
                    { data.map(item => (
                        <Link sx={styles.link} href="/">
                            <ServiceCard key={item.title} text={item.text} icon={item.icon}/>
                        </Link>
                    )) }
                </Box>
            </Box>
        </>
    )
}


const styles = {
    logoBox: {
        mt: {xs: 8, md: 14},
        width: "100%", 
        display: "flex", 
        justifyContent: "center"
    },
    logoAvatar: {
        width: "65%",
        maxWidth: 500,
        height: "auto"
    },
    contentBox: {
        mt: {xs: 6, md: 14},
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    innerBox: {
        width: "90%",
        maxWidth: 500
    },
    link: {
        textDecoration: "none"
    }
}