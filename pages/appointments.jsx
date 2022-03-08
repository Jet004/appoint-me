import React, { useEffect, useState } from 'react'

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
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

// Data
import servicesData from '../utility/mockData/ServicesData'
import availability from '../utility/mockData/availability'
import isSameDay from 'date-fns/isSameDay'
import isWeekend from 'date-fns/isWeekend'
import format from 'date-fns/format'


export default function Appointments() {
    const [service, setService] = useState("")
    const [pickedDate, setPickedDate] = useState(new Date())

    const handleChangeService = (e) => {
        setService(e.target.value)
    }

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
                                <InputLabel sx={styles.servicesInputLabel} id="services-select-label">Services</InputLabel>
                                <Select 
                                    labelId="services-select-label" 
                                    sx={styles.services} 
                                    autoWidth={true}
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
                                shouldDisableDate={isWeekend}
                                value={pickedDate}
                                onChange={(newDate) => {
                                    setPickedDate(newDate)
                                }}
                                renderInput={(params) => <TextField {...params} sx={styles.datePickerInput} />}
                            />
                        </Box>
                        <Box sx={styles.appointmentListBox}>
                            <Typography variant="h5">{(service && pickedDate) ? service : "Choose a service and a date..."}</Typography>
                            <Typography sx={{pl: 2}} variant="caption"> *You need to be logged in to make an appointment</Typography>
                            {service && (<List sx={styles.availabilityList}>
                                {availability[service]?.map(date => {
                                    if(isSameDay(pickedDate, date.datetime)) return (
                                    <ListItemButton><ListItemText>{format(date.datetime, "hh:mm aaa")} - {service} Session</ListItemText></ListItemButton>
                                    )
                                })}
                                {availability[service]?.filter(date => isSameDay(pickedDate, date.datetime)).length <= 0 && ("Oops... It seems we are booked out")}
                            </List>)}
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
    servicesInputLabel: {
        color: 'custom.contrastTextStrong'
    },
    services: {
        width: "100%",

    },
    datePickerInput: {
        width: {xs: "50%"}
    },
    appointmentListBox: {
        width: "100%",
        minHeight: "300px",
        p: 2,
    }
}