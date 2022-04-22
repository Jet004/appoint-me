import React, { useContext } from 'react'
// ONLY NEEDED FOR PROTOTYPE
import { useRouter } from 'next/router'

// Next.js imports
import Head from 'next/head'

// Styles, UI, UX
import Box from '@mui/material/Box'
import BusinessProfileLayout from '../../layout/businessProfileLayout'
import ServiceCard from '../../components/serviceCard/serviceCard'
import Link from '../../components/link'

import userContext from '../../utility/mockData/appContext'
import { serviceData } from '../../components/serviceCard/serviceCardData'


export default function BusinessProfile() {
    // ROUTER FOR PROTOTYPE FILTER
    const router = useRouter()
    const userData = useContext(userContext)
    console.log(userData)
    // THIS WILL CHANGE IN NON-PROTOTYPE VERSION
    // Filter service card data based on login status
     
    const data = userData.userType ? serviceData[userData.userType].filter((item) => item.title !== 'appointment' ) : null

    return (
        <>
            <BusinessProfileLayout logo="full" title="" page="Business Profile">
                <Box sx={styles.innerBox}>
                    { userData.userType === "businessRep" && (<div>This page will comprise the admin panel for businessReps and will be implemented in the next iteration of the project</div>)}
                    { data && data.map(item => (
                        <Link sx={styles.link} href={item.path} key={item.title} > {/* The href is currently hardcoded to the business profile page but will be made dynamic in the future */}
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
        minWidth: 300,
        maxWidth: 500
    },
    link: {
        textDecoration: "none"
    }
}