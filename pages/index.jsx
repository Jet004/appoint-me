import React from 'react'
// ONLY NEEDED FOR PROTOTYPE
import { useRouter } from 'next/router'

// Next.js imports
import Head from 'next/head'

// Styles, UI, UX
import { Typography } from '@mui/material'
import CustomImage from '../components/custom-image'
import Box from '@mui/material/Box'
import BusinessProfileLayout from '../layout/businessProfileLayout'
import ServiceCard from '../components/serviceCard/serviceCard'
import Link from '../components/link'

import { serviceData } from '../components/serviceCard/serviceCardData'


export default function Index() {
    // ROUTER FOR PROTOTYPE FILTER
    const router = useRouter()
    // THIS WILL CHANGE IN NON-PROTOTYPE VERSION
    // Filter service card data based on login status
    const data = serviceData.filter((item) => item.title !== 'makeAppointment' )

    return (
        <>
            <BusinessProfileLayout logo="full" title="">
                <Box sx={styles.innerBox}>
                    { data.map(item => (
                        <Link sx={styles.link} href={item.path} key={item.title} >
                            <ServiceCard text={item.text} icon={item.icon}/>
                        </Link>
                    )) }
                </Box>
            </BusinessProfileLayout>
        </>
    )
}


const styles = {
    innerBox: {
        width: "90%",
        maxWidth: 500
    },
    link: {
        textDecoration: "none"
    }
}