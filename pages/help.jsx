import Image from 'next/image'

// Import components
import Box from '@mui/material/Box'
import Layout from '../layout/layout.jsx'
import Typography from '@mui/material/Typography'


import React from 'react'

const Help = () => {
    return (
        <Layout page="Help">
            <Box sx={styles.contentBox}>
                <Box sx={styles.innerBox}>
                    <Typography sx={styles.title} variant="h4" align="left">Help</Typography>
                    <Typography sx={styles.title} variant="h5" align="left">How to Make an Appointment</Typography>
                    <Typography variant="body1" gutterBottom>To make an appointment on the Jet Mandarin application you must first have created an account and be logged in.</Typography>
                    <Typography variant="body1" gutterBottom>Once you are logged into your account follow the steps below to create an appointment:</Typography>
                    <Typography variant="body1" gutterBottom>1. Navigate to the &apos;Services&apos; page</Typography>
                    <Typography variant="body1" gutterBottom>2. Select the link titled &apos;Make an appointment&apos;</Typography>
                    <Box sx={styles.imageWrapper}>
                        <Image src={"/images/help/help1.png"} alt="help image 1" quality="100" width={200} height={432} placeholder={"empty"} />
                    </Box>
                    <Typography variant="body1" gutterBottom>3. Select a service from the dropdown (a list of  all services is available on the Services page)</Typography>
                    <Typography variant="body1" gutterBottom>4. Select when you would like to book the appointment for. This will display a list of all of the available appointment times for that day</Typography>
                    <Typography variant="body1" gutterBottom>5. Select a suitable time from the list</Typography>
                    <Box sx={styles.imageWrapper}>
                        <Image src={"/images/help/help2.png"} alt="help image 2" quality="100" width={200} height={432} placeholder={"empty"} />
                    </Box>
                    <Typography variant="body1" gutterBottom>6. Confirm the appointment if the details are correct</Typography>
                    <Box sx={styles.imageWrapper}>
                        <Image src={"/images/help/help3.png"} alt="help image 3" quality="100" width={200} height={132} placeholder={"empty"} />
                    </Box>
                    <Typography variant="body1" gutterBottom>7. A confirmation message will display if the booking was successful</Typography>
                    <Box sx={styles.imageWrapper}>
                        <Image src={"/images/help/help4.png"} alt="help image 4" quality="100" width={200} height={46} placeholder={"empty"} />
                    </Box>
                    <Typography variant="body1" gutterBottom>8. Navigate to the &apos;Home&apos; page to confirm that your booking was made successfully</Typography>
                    <Box sx={styles.imageWrapper}>
                        <Image src={"/images/help/help5.png"} alt="help image 5" quality="100" width={200} height={432} placeholder={"empty"} />
                    </Box>
                </Box>
            </Box>
        </Layout>   
    )
}

export default Help

const styles = {
    contentBox: {
        mt: {xs: 4, md: 8},
        width: "100%",
        minWidth: "360px",
        display: "flex",
        justifyContent: "center"
    },
    innerBox: {
        color: "custom.contrastText",
        width: "90%",
        maxWidth: 500,
    },
    title: {
        mb: 3,
    },
    imageWrapper: {
        display: "flex",
        justifyContent: "center",
        my: 3,
    }
}