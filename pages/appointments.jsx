import React from 'react'

// Next.js imports
import Head from 'next/head'

// Components
import Layout from '../layout/layout'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'

// Data
import servicesData from '../utility/mockData/ServicesData'


export default function Appointments() {

  return (
    <>
        <Head>
            <title>AppointMe: Appointments</title>
        </Head>
        <Layout page=" ">
            <Container sx={styles.cont}>
                <Typography variant="h3">Availability</Typography>
                <Box sx={styles.outerBox}>
                    <Box sx={styles.innerBox}>
                        <FormControl>
                            <InputLabel>Services</InputLabel>
                            <Select>
                                <MenuItem></MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                
            </Container>
        </Layout>
        
    </>
  )
}


const styles = {
    cont: {
        mt: 2,
        width: {xs: "100%", md: "90%"},
    },
    outerBox: {
        width: "100%",
        display: "flex",
        justifyContent: "Center",
    },
    innerBox: {
        backgroundImage: (theme)=> (theme.palette.custom.gradient.light),
        width: {xs: "80%", md: "60%"},
        minWidth: "300px",
        maxWidth: "600px",
        padding: "20px",
        border: "1px solid white",
        borderRadius: "12px",
    }
}