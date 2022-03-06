import React, { useState } from 'react'

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
import OutlinedInput from '@mui/material/OutlinedInput'
import Box from '@mui/material/Box'
import DatePicker from '@mui/lab/DatePicker'

// Data
import servicesData from '../utility/mockData/ServicesData'
import { TextField } from '@mui/material'


export default function Appointments() {
    const [service, setService] = useState("")
    const [pickedDate, setPickedDate] = useState(new Date())

    const handleChangeService = (e) => {
        setService(e.target.value)
        console.log("Value: ", e.target.value)
    }
    console.log("Service: ", service)
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
                        <Box  sx={styles.calendarHead}>
                            <FormControl sx={{width: "45%"}}>
                                <InputLabel id="services-select-label">Services</InputLabel>
                                <Select 
                                    labelId="services-select-label" 
                                    sx={styles.services} 
                                    autoWidth="true" 
                                    value={service}
                                    onChange={handleChangeService}
                                    input={<OutlinedInput label="Services" />}
                                    MenuProps={styles.services}
                                >
                                    {servicesData.map(service => (
                                        <MenuItem key={service.title} value={service.title}>{service.title}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <DatePicker
                                label="Date"
                                value={pickedDate}
                                onChange={(newDate) => {
                                    setPickedDate(newDate)
                                }}
                                renderInput={(params) => <TextField {...params} sx={styles.datePickerInput} />}
                            />
                        </Box>
                    </Box>
                </Box>
                
            </Container>
        </Layout>
        
    </>
  )
}


const styles = {
    cont: (theme) => ({
        mt: 2,
        minWidth: "360px",
        width: {xs: "100%", md: "90%"},
        [theme.breakpoints.down("sm")]: {
            px: 1,
        }
    }),
    outerBox: {
        width: "100%",
        display: "flex",
        justifyContent: "Center",
    },
    innerBox: (theme) => theme.palette.mode === 'dark' ? {
        backgroundImage: (theme)=> (theme.palette.custom.gradient.light),
        width: {xs: "100%", md: "80%", lg: "60%"},
        minWidth: "300px",
        maxWidth: "600px",
        mt: 2,
        border: (theme) => (`1px solid ${theme.palette.custom.contrastText}`),
        borderRadius: "25px",
    } : {
        width: {xs: "100%", md: "80%", lg: "60%"},
        minWidth: "300px",
        maxWidth: "600px",
        mt: 2,
        borderRadius: "25px",
    },
    calendarHead: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
    },
    services: {
        width: "100%",

    },
    datePickerInput: {
        width: {xs: "50%"}
    },
}