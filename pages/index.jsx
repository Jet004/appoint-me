import React from 'react'
// ONLY NEEDED FOR PROTOTYPE
import { useRouter } from 'next/router'

// Styles, UI, UX
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
    const data = serviceData.unauthenticated

    return (
        <>
            <BusinessProfileLayout logo="full" title="" page=" ">
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