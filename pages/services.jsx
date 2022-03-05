import { useState, useContext } from 'react'
import userDataContext from '../utility/mockData/userDataContext'

// Styles, UI, UX
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import BusinessProfileLayout from '../layout/businessProfileLayout'
import Link from '../components/link'

export default function Login() {

    return (
        <>
            <BusinessProfileLayout logo="thumb" title="About">
                <Box sx={styles.innerBox}>
                    <Typography sx={styles.title} variant="h3">
                        Services We Offer
                    </Typography>
                    <Typography variant="body1">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, quo. Ipsam, perspiciatis odit? Eaque, fuga? Velit id inventore placeat rerum cupiditate quam quasi aliquid, repellendus obcaecati voluptatibus. Nemo, nulla fugiat!</p>
                    </Typography>
                    <Typography variant="h6">Individual Tutoring</Typography>
                    <Typography variant="body1">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos et hic perferendis commodi exercitationem? Asperiores eos aliquid saepe, odit, vero accusantium voluptatum dicta cumque nam mollitia ex obcaecati aliquam dolore.</p>
                        <ul>
                            <li>Price: $50 - 1hr class</li>
                            <li>Content</li>
                            <li>Personal Mandarin Master Teacher</li>
                            <li><Link href="/appointments?service=individual">Check our available class times</Link></li>
                        </ul>
                    </Typography>
                    <Typography variant="h6">Pronunciation Master Class</Typography>
                    <Typography variant="body1">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae eius beatae, maxime porro voluptatum ab inventore nesciunt saepe quas minima quibusdam animi dolore esse error magnam cum eligendi amet sit?</p>
                        <ul>
                            <li>Price: $50 - 1hr class</li>
                            <li>Content</li>
                            <li>Personal Native Speaking Phontetics Master</li>
                            <li><Link href="/appointments?service=pronunciation">Check our available class times</Link></li>
                        </ul>
                    </Typography>
                    <Typography variant="h4">We're dedicated to your success!</Typography>

                </Box>
            </BusinessProfileLayout>
        </>
    )
}


const styles = {
    innerBox: {
        mt: {sm: 2, md: 0},
        width: "90%",
        maxWidth: 800,
        color: "custom.contrastText",
    },
    title: {
        
    },
    form: {
        mt: 3,
        display: "flex",
        flexDirection: "column",
    },
    formItem: {
        mt: 1,
    }
}
