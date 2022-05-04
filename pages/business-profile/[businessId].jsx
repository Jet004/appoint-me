import { useContext } from 'react'
import userContext from '../../utility/appContext'

// Import components
import Box from '@mui/material/Box'
import BusinessProfileLayout from '../../layout/businessProfileLayout'
import ServiceCard from '../../components/serviceCard/serviceCard'
import Link from '../../components/link'

// Import data JSON
import { serviceData } from '../../components/serviceCard/serviceCardData'


export default function BusinessProfile() {
    // Access global user context
    const userData = useContext(userContext)

    // Filter service card data based on userType
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