import React, { useState, useContext } from 'react'

// Next.js imports
import Head from 'next/head'

// Components
import Layout from '../layout/layout'

// MUI UI
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from '@mui/lab/DatePicker'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// Data
import servicesData from '../utility/mockData/ServicesData'
import availability from '../utility/mockData/availability'
import userDataContext from '../utility/mockData/userDataContext'

// date-fns
import isSameDay from 'date-fns/isSameDay'
import isWeekend from 'date-fns/isWeekend'
import format from 'date-fns/format'


export default function Appointments() {
    // Get user data
    const userData = useContext(userDataContext)


    //
    const [service, setService] = useState("")
    const [pickedDate, setPickedDate] = useState(new Date())
    const [dialogOpen, setDialogOpen] = useState(false)
    const [appointmentDetails, setAppointmentDetails] = useState({})
    const [toastState, setToastState] = useState(false)

    const handleChangeService = (e) => {
        setService(e.target.value)
    }

    const handleOpenDialog = (data) => {
        console.log(data.datetime)
        setDialogOpen(true)
        setAppointmentDetails({
            service: service,
            date: format(data.datetime, "dd MMM yyyy"),
            time: format(data.datetime, "HH:00 aaa")
        })
    }

    const handleBookAppointment = () => {
        console.log("Appointment booked successfully")
        setDialogOpen(false)
        setToastState(true)
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
                            {!userData.loggedIn && (
                                <Typography sx={{pl: 2}} variant="caption"> *You need to be logged in to make an appointment</Typography>
                            )}
                            {service && (<List sx={styles.availabilityList}>
                                {availability[service]?.map(date => {
                                    if(isSameDay(pickedDate, date.datetime)) return (
                                        <ListItemButton onClick={userData.loggedIn ? () => handleOpenDialog(date) : ""} ><ListItemText>{format(date.datetime, "hh:mm aaa")} - {service} Session</ListItemText></ListItemButton>
                                    )
                                })}
                                {availability[service]?.filter(date => isSameDay(pickedDate, date.datetime)).length <= 0 && ("Oops... It seems we are booked out")}
                            </List>)}
                        </Box>
                        <Dialog
                            open={dialogOpen}
                            onClose={() => setDialogOpen(false)}
                            aria-labelledby="dialog-title"
                            aria-describedby="dialog-description"
                        >
                            <DialogTitle id="dialog-title">
                                {"Book an Appointment"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="dialog-description">
                                    Would you like to book this appointment?<br />
                                    {`${appointmentDetails.service} Session at ${appointmentDetails.time} on ${appointmentDetails.date}`}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                                <Button onClick={handleBookAppointment}>Book</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Box>
                <Snackbar sx={styles.toast} open={toastState} autoHideDuration={6000} onClose={() => setToastState(false)} TransitionComponent="Fade">
                    <Alert severity="success" elevation={6} variant="filled">Your appointment has been booked!</Alert>
                </Snackbar>
                
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
    },
    toast: {
        mb: 8,
    }
}