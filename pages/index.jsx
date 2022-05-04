import React from 'react'

// Import components
import Box from '@mui/material/Box'
import BusinessProfileLayout from '../layout/businessProfileLayout'
import ServiceCard from '../components/serviceCard/serviceCard'
import Link from '../components/link'

// Import data JSON
import { serviceData } from '../components/serviceCard/serviceCardData'


export default function Index() {
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