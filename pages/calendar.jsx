import React, { useContext, useEffect, useState } from 'react'

// Next.js imports
import Head from 'next/head'

// Components
import Layout from '../layout/layout'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import DatePicker from '@mui/lab/DatePicker'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

// Icons
import CalendarViewDayRoundedIcon from '@mui/icons-material/CalendarViewDayRounded';
import CalendarViewWeekRoundedIcon from '@mui/icons-material/CalendarViewWeekRounded';
import CalendarViewMonthRoundedIcon from '@mui/icons-material/CalendarViewMonthRounded';

// Data
import userDataContext from '../utility/mockData/userDataContext'
import isSameDay from 'date-fns/isSameDay'
import isWeekend from 'date-fns/isWeekend'
import format from 'date-fns/format'


export default function Appointments() {
    // Get user data
    const userData = useContext(userDataContext)

    const [calendarState, setCalendarState] = useState("day")
    const [pickedDate, setPickedDate] = useState(new Date())

  return (
    <>
        <Head>
            <title>AppointMe: Calendar</title>
        </Head>
        <Layout page="Calendar">
            <Container sx={styles.cont}>
                <Typography variant="h3">My Appointments</Typography>
                <Box sx={styles.outerBox}>
                    <Box sx={styles.innerBox}>
                        <Box  sx={styles.calendarHead}>
                            <ButtonGroup size="small">
                                <Button sx={calendarState === "day" ? {backgroundColor: "#444"} : ""} onClick={() => setCalendarState("day")}><CalendarViewDayRoundedIcon fontSize="small" /></Button>
                                <Button sx={calendarState === "week" ? {backgroundColor: "#444"} : ""} onClick={() => setCalendarState("week")}><CalendarViewWeekRoundedIcon fontSize="small" /></Button>
                                <Button sx={calendarState === "month" ? {backgroundColor: "#444"} : ""} onClick={() => setCalendarState("month")}><CalendarViewMonthRoundedIcon fontSize="small" /></Button>
                            </ButtonGroup>
                            <DatePicker
                                label="Date"
                                shouldDisableDate={isWeekend}
                                value={pickedDate}
                                onChange={(newDate) => {
                                    setPickedDate(newDate)
                                }}
                                renderInput={(params) => <TextField variant="standard" {...params} sx={styles.datePickerInput} />}
                            />
                        </Box>
                        {calendarState}
                        <Box sx={styles.appointmentListBox}>
                            <Typography variant="h5">Appointments</Typography>
                            <List sx={styles.availabilityList}>
                                {userData.appointments?.map(appointment => {
                                    if(isSameDay(pickedDate, appointment.datetime)) return (
                                    <ListItemButton><ListItemText>{format(appointment.datetime, "hh:mm aaa")} - {appointment.service} Session</ListItemText></ListItemButton>
                                    )
                                })}
                                {userData.appointments?.filter(appointment => isSameDay(pickedDate, appointment.datetime)).length <= 0 && ("It seems that you don't have any appointments... yet")}
                            </List>
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