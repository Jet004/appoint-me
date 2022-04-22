import React, { useContext } from 'react'

// Next.js imports
import Head from 'next/head'

// Components
import Layout from '../layout/layout'

// Styles, UI, UX
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Icon from '@mui/material/Icon'

import EventRoundedIcon from '@mui/icons-material/EventRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

// Mock Data
import userContext from '../utility/mockData/appContext'
import format from 'date-fns/format'
import isPast from 'date-fns/isPast'
import isToday from 'date-fns/isToday'

// Images


export default function Home() {

    // Allow access to user data
    const userData = useContext(userContext)
    console.log(userData)

  return (
    <>
        <Head>
            <title>AppointMe: Home</title>
        </Head>
        <Layout page="Home">
            <Container sx={styles.cont}>
                <Box sx={styles.outerBox}>
                    <Alert sx={styles.errorAlert} variant="outlined" severity="error">You have overdue payments to attend to</Alert>
                    <Box sx={styles.innerBox}>
                        <Box sx={styles.innerBoxHeader}>
                            <Typography sx={styles.innerBoxHeaderTitle} variant="h5">
                                <EventRoundedIcon sx={styles.titleIcon} />
                                Upcoming Appointments
                                </Typography>
                            <Divider sx={styles.innerBoxHeaderDivider} />
                        </Box>
                        <Box sx={styles.innerBoxBody}>
                            { console.log(userData.appointments)}
                            <List sx={styles.itemList}>
                                {userData.appointments !== undefined && userData.appointments.map(appointment => {
                                    if(!isPast(appointment.datetime)) return (
                                        <>
                                        {/* {console.log("Is Today: ", isToday(appointment.datetime))} */}
                                            <ListItemButton sx={styles.listItem} key={appointment.datetime}>
                                                <Box sx={styles.appointmentsDateBox}>
                                                    <Typography variant="caption">
                                                        {format(appointment.datetime, "MMM")}
                                                    </Typography>
                                                    <Typography variant="h5">
                                                        {format(appointment.datetime, "dd")}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography sx={styles.listItemText} variant="body1">
                                                    {format(appointment.datetime, "h:mm aaa")}
                                                    </Typography>
                                                    <Typography sx={styles.listItemText} variant="body1">
                                                    {appointment.service} Tutoring Session
                                                    </Typography>
                                                </Box>
                                            </ListItemButton>
                                            <Divider sx={styles.itemListDivider} variant="middle" />
                                        </>
                                    )
                                })}
                            </List>
                        </Box>
                    </Box>
                    <Box sx={styles.innerBox}>
                        <Box sx={styles.innerBoxHeader}>
                            <Typography sx={styles.innerBoxHeaderTitle} variant="h5">
                                <PaymentsRoundedIcon sx={styles.titleIcon} />
                                Upcoming Payments
                            </Typography>
                            <Divider sx={styles.innerBoxHeaderDivider} />
                        </Box>
                        <Box sx={styles.innerBoxBody}>
                            <List sx={styles.itemList}>
                                {userData.appointments !== undefined && userData.appointments.map(appointment => {
                                    if(appointment.paymentStatus !== "paid") return (
                                    <>
                                        <ListItemButton 
                                            sx={[{...styles.listItem}, () => isPast(appointment.feeDueDate) ? ({...styles.overdue}) : ""]} 
                                            key={appointment.feeDueDate}
                                            title={isPast(appointment.feeDueDate) ? "Overdue Payment" : ""}
                                        >
                                            <Box sx={styles.appointmentsDateBox}>
                                                <Typography variant="caption">
                                                    {format(appointment.feeDueDate, "MMM")}
                                                </Typography>
                                                <Typography variant="h5">
                                                    {format(appointment.feeDueDate, "dd")}
                                                </Typography>
                                            </Box>
                                            <Box sx={styles.paymentsDetail}>
                                                <Typography sx={styles.listItemText} variant="body1">
                                                    Jet Mandarin
                                                </Typography>
                                                <Typography sx={styles.listItemText} variant="body1">   
                                                    Amount Due: ${appointment.fee}
                                                </Typography>
                                            </Box>
                                            {isPast(appointment.feeDueDate) && (
                                                <ErrorOutlineRoundedIcon sx={styles.overdueIcon} />
                                            )}
                                        </ListItemButton>
                                        <Divider sx={styles.itemListDivider} variant="middle" />
                                    </>
                                )})}
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
        mb: 10,
        minWidth: "360px",
        width: {xs: "100%", md: "90%"},
        [theme.breakpoints.down("sm")]: {
            px: 1/5,
        }
    }),
    outerBox: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    innerBox: (theme) => theme.palette.mode === 'dark' ? {
        // Dark Theme
        backgroundImage: (theme)=> (theme.palette.custom.gradient.light),
        width: {xs: "90%", md: "80%", lg: "60%"},
        minWidth: "300px",
        maxWidth: "600px",
        height: "40vh",
        mt: 2,
        borderRadius: "25px",
        overflow: "hidden",
    } : {
        // Light Theme
        width: {xs: "100%", md: "80%", lg: "60%"},
        minWidth: "300px",
        maxWidth: "600px",
        mt: 2,
        borderRadius: "25px",
        overflow: "hidden",
    },
    innerBoxHeader: (theme) => theme.palette.mode === 'dark' ? {
        // Dark Theme
        backgroundImage: (theme)=> (theme.palette.custom.gradient.light),
        pt: 2,
        px: 3,
        pb: 2,
        borderRadius: "25px 25px 0px 0px",
    } : {
        // Light theme
        pt: 2,
        px: 3,
        borderRadius: "25px 25px 0px 0px",
    },
    innerBoxHeaderTitle: {
        color: (theme) => theme.palette.mode === 'dark' ? "custom.contrastText" : 'primary.main',
        pl: {xs: 3/2, sm: 3},
        display: "flex",
    },
    titleIcon: {
        mr: 1
    },
    innerBoxHeaderDivider: {
        borderColor: (theme) => theme.palette.mode === 'dark' ? 'custom.contrastText' : 'custom.contrastText',
        pt: 1/2,
    },
    innerBoxBody: {
        width: "100%",
        height: "34vh",
        overflow: "auto",
    },
    itemList: {
        px: {xs: 0, sm: 2, md: 4},
        display: "flex",
        flexDirection: "column",
    },
    listItem: {
        // backgroundImage: (theme) => (theme.palette.custom.gradient.light),
        // borderRadius: "25px",
        // boxShadow: 3,
        mx: {xs: 0, sm: 3, md: 6},
        width: {xs: "100%", sm: "90%"},
        alignSelf: "center",
        display: "flex",
        alignItems: "flex-end",
    },
    itemListDivider: {
        borderColor: 'custom.contrastText',
        pt: 1/2
    },
    appointmentsDateBox: {
        display: "flex",
        flexDirection: "column",
    },
    listItemText: {
        width: "100%",
        pl: {xs: 2, sm: 2, md: 3},
        display: "flex",
        alignItems: "flex-end",
    },
    appointmentsToday: {
        color: "primary",
    },
    paymentsDetail: {
        width: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
    },
    overdue: {
        border: "1px solid",
        borderColor: "error.main",
        borderRadius: "4px",
    },
    overdueIcon: {
        fontSize: "32px",
        color: "error.main",
        justifySelf: "flex-end",
        alignSelf: "center",
    },
}