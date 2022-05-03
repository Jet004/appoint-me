import { useState, useContext } from 'react'
import userContext from '../../../utility/mockData/appContext'

// Styles, UI, UX
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import BusinessProfileLayout from '../../../layout/businessProfileLayout'

export default function Login() {

    return (
        <>
            <BusinessProfileLayout logo="thumb" title="About" page="About">
                <Box sx={styles.innerBox}>
                    <Typography sx={styles.title} variant="h3">
                        About Us
                    </Typography>
                    <Typography variant="body1">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, quo. Ipsam, perspiciatis odit? Eaque, fuga? Velit id inventore placeat rerum cupiditate quam quasi aliquid, repellendus obcaecati voluptatibus. Nemo, nulla fugiat!
                    </Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos et hic perferendis commodi exercitationem? Asperiores eos aliquid saepe, odit, vero accusantium voluptatum dicta cumque nam mollitia ex obcaecati aliquam dolore.
                    </Typography>
                    <Typography variant="body1">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae eius beatae, maxime porro voluptatum ab inventore nesciunt saepe quas minima quibusdam animi dolore esse error magnam cum eligendi amet sit?
                    </Typography>
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
        "& p": {
            my: 1,
        },
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
