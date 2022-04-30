import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import userContext from '../utility/mockData/appContext'
import AppointmentDetail from '../components/AppointmentDetail'

// Components
import Alert from '@mui/material/Alert' // This is not implemented at present - will be used to display overdue payment messages
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import FeatureBox from '../components/featureBox'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import Layout from '../layout/layout'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Spinner from '../components/spinner'
import Toast from '../components/toast'
import Typography from '@mui/material/Typography'

// Import icons
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded' // This is not implemented at present - will be used to display payment related icons
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded' // This is not implemented at present - will be used to display payment related icons

// Import date functions
import format from 'date-fns/format'
import isPast from 'date-fns/isPast'
import isToday from 'date-fns/isToday'
import FloatingDialog from '../components/FloatingDialog'


export default function Home() {
    // Allow access to user data
    const userData = useContext(userContext)

    // State Management
    const [businessId, setBusinessId] = useState(null)
    const [crmData, setCrmData] = useState(null)
    const [appointments, setAppointments] = useState(null)
    // const [appointmentDetailDialog, setAppointmentDetailDialog] = useState(false) // This is not implemented at present - will be used to display appointment detail dialog
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [responseMessage, setResponseMessage] = useState(null)
    console.log("APPOINTMENTS: ", appointments)
    console.log("CRM DATA: ", crmData)

    // Get businessId if user is of type businessRep
    useEffect(() => {
        console.log("getBusinessId called")
        const requestHandler = async () => {
            console.log("getBusinessId RAN")
            try {
                // Start spinner
                setIsLoading(true)

                // Request businessId
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/business-reps/business/${userData.user._id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                    }
                })
                const data = await response.json()

                // Stop spinner
                setIsLoading(false)
    
                // Throw error if request fails
                if (response.status !== 200) {
                    throw {
                        status: data.status,
                        message: data.message
                    }
                }
    
                // Request was successful, set businessId
                // No need to inform the user as success is expected
                setBusinessId(data.business._id)
    
                console.log("USER DATA: ", userData)

            } catch(error) {
                console.log(error)

                // Inform the user of the error
                setResponseMessage({
                    status: error.status,
                    message: error.message,
                    severity: "error"
                })
            }
        }

        // Only request businessId if user is of type businessRep
        if(userData.loggedIn, userData.userType === "businessRep") requestHandler()

    }, [userData])

    // Get appointments for the logged in user
    useEffect(() => {
        console.log("getAppointments called")
        // Define a function to handle the request for user appointments
        const requestHandler = async () => {
            console.log("getAppointments RAN")
            try {
                // Prevent request if user is businessRep and no businessId is set
                if(userData.userType === "businessRep" && !businessId) return

                // Start spinner
                setIsLoading(true)
                
                // Set the correct url for the request based on user type
                let url = `${process.env.NEXT_PUBLIC_API_URL}/api/appointments`
                if(userData.userType === "user"){
                    url += `/user-appointments`
                } else if (userData.userType === "businessRep"){
                    url += `/business-rep-appointments/${businessId}`
                } else {
                    // Invalid user type, throw error
                    throw {
                        status: "error",
                        message: "Invalid user type"
                    }
                }

                // Get the user's appointments
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                    }
                })
                const data = await response.json()

                // Stop spinner
                setIsLoading(false)

                // Throw an error if the request failed
                if (response.status !== 200) {
                    throw {
                        status: data.status,
                        message: data.message
                    }
                }

                // Request was successful, set the appointments state
                // No need to inform the user as success is expected
                setCrmData(data.data)
                // Filter appointments to only show today and future appointments
                const getAppointments = data.data.map(crm => {
                    crm.appointments.map(appt => {
                        appt.clientName = `${crm.user.fname} ${crm.user.lname}`
                        appt.businessName = crm.business.name
                        appt.service = crm.business.services.find(service => service._id === appt.service)
                        return appt
                    })
                    return crm.appointments
                }).flat()
                const filteredAppointments = getAppointments.filter(appointment => (isToday(new Date(appointment.appointmentTime)) || !isPast(new Date(appointment.appointmentTime))))
                // Sort appointments by date and time (ascending)
                const sortedAppointments = filteredAppointments.sort((a, b) => new Date(a.appointmentTime) - new Date(b.appointmentTime))

                // Sort appointments by datetime (ascending)
                setAppointments(sortedAppointments)

            } catch (error) {
                console.log(error)

                // Inform the user of the error
                setResponseMessage({
                    status: error.status,
                    message: error.message,
                    severity: "error"
                })
            }
        }
    
        // Send request if user data is available
        if(userData.loggedIn) requestHandler()

    }, [userData, businessId])


    // Handle delete appointment
    const deleteAppointment = async (appointmentId) => {
        try {
            console.log("APPT ID: ", appointmentId)

            // Check that the appointmentId is set
            if(!appointmentId) {
                throw {
                    status: "error",
                    message: "Error: could not delete appointment"
                }
            }

            // Start spinner
            setIsLoading(true)

            // Define the url for the request based on user type
            let url = `${process.env.NEXT_PUBLIC_API_URL}/api/appointments`
            if(userData.userType === "user"){
                url += `/user/crud/${appointmentId}`
            } else if (userData.userType === "businessRep"){
                url += `/business-rep/crud/${appointmentId}`
            } else {
                // Invalid user type, throw error
                throw {
                    status: "error",
                    message: "Invalid user type"
                }
            }

            // Send request to delete appointment
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            })

            // Stop spinner
            setIsLoading(false)

            // Throw error if request failed
            if (response.status !== 204) {
                const data = await response.json()
                throw {
                    status: data.status,
                    message: data.message
                }
            }

            // Request was successful, force appointment list to reload


            // Inform the user of the success
            setResponseMessage({
                status: "success",
                message: "Success: appointment deleted",
                severity: "success"
            })

        } catch(error) {
            console.log(error)

            // Inform the user of the error
            setResponseMessage({
                status: error.status,
                message: error.message,
                severity: "error"
            })
        }

    }

  return (
    <>
        <Head>
            <title>AppointMe: Home</title>
        </Head>
        <Layout page="Home">
            <Container sx={styles.cont}>
                <Box sx={styles.outerBox}>
                    {/* Not yet implemented - will be implemented with payment tracking */}
                    {/* <Alert sx={styles.errorAlert} variant="outlined" severity="error">You have overdue payments to attend to</Alert> */}
                    
                    <FeatureBox title="Upcoming Appointments" iconLeft={<EventRoundedIcon />}>
                        <List sx={styles.itemList}>
                            { appointments && appointments.map(appointment => {
                                if(!isPast(new Date(appointment.appointmentTime))) return (
                                    <>
                                    {/* {console.log("Is Today: ", isToday(appointment.appointmentTime))} */}
                                    {/* {console.log("Is Past: ", isPast(appointment.appointmentTime))} */}
                                        <ListItem
                                            sx={styles.listItem} 
                                            key={appointment.appointmentTime}
                                            secondaryAction={
                                                <IconButton onClick={() => setDeleteDialog([true, appointment._id])}>
                                                    <DeleteForeverRoundedIcon fontSize="20px" />
                                                </IconButton>
                                            }
                                            disablePadding
                                            divider
                                        >
                                            <ListItemButton
                                                disableGutters
                                                // onClick={() => setAppointmentDetailDialog(true)} // This feature is not yet implemented
                                            >
                                                <Box sx={styles.appointmentsDateBox}>
                                                    <Typography variant="caption" align='center'>
                                                        {format(new Date(appointment.appointmentTime), "MMM")}
                                                    </Typography>
                                                    <Typography variant="h5" align='center'>
                                                        {format(new Date(appointment.appointmentTime), "dd")}
                                                    </Typography>
                                                </Box>
                                                <Box sx={styles.listItemText}>
                                                    <Typography variant="body1">
                                                        {format(new Date(appointment.appointmentTime), "h:mm aaa")} - { userData.userType === 'user' ? appointment.businessName : appointment.service.name }
                                                    </Typography>
                                                    { userData.userType === "businessRep" && (
                                                        <Typography variant="body1">
                                                            Client: {appointment.clientName}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </ListItemButton>
                                        </ListItem>
                                    </>
                                )
                            })}
                        </List>
                    </FeatureBox>

                    {/* Not yet implemented - will be implemented with payment tracking */}
                    {/* Refactor to use FeatureBox */}
                    {/* <Box sx={styles.innerBox}>
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
                    </Box> */}
                </Box>

                <Toast response={responseMessage} setResponse={() => setResponseMessage(null)} hideIn={6000} />
                <Spinner open={isLoading} />

                <FloatingDialog 
                    open={deleteDialog[0]}
                    onClose={() => setDeleteDialog(false)}
                    type="delete"
                    onConfirm={() => deleteAppointment(deleteDialog[1])}
                >
                    <Typography variant="body1">Please confirm that you would like to delete this appointment.</Typography>
                    <Typography variant="caption"  color="error">Warning: This action is permanent. Any data deleted will be unrecoverable.</Typography>
                </FloatingDialog>

                {/* Appointment Detail Dialog - Not yet implemented */}
                {/* <AppointmentDetail 
                    open={appointmentDetailDialog} 
                    onClose={() => setAppointmentDetailDialog(false)} 
                /> */}
                

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
    itemList: {
        height: 450,
        overflowY: "scroll",
        pt: 0,
        px: 2,
        pb: 2,
        display: "flex",
        flexDirection: "column",
    },
    listItem: {
        mt: 1,
        mx: {xs: 0, sm: 3, md: 6},
        width: {xs: "100%", sm: "90%"},
        alignSelf: "center",
        display: "flex",
        '& .MuiListItemButton-root': {
            pl: 2,
            pr: 4,
        },
        '& .MuiTypography-root, & .MuiListItemIcon-root': {
            color: (theme) => theme.palette.mode === 'dark' ? "custom.contrastText" : 'text.custom.highlight',
        },
        '& .MuiListItemSecondaryAction-root': {
            right: 0,
        },
        '& .MuiListItemSecondaryAction-root svg': {
            color: (theme) => theme.palette.mode === 'dark' ? "custom.contrastText" : 'custom.highlight',
        },
        // '&:hover': {
        //     borderColor: "custom.contrastTextLight",
        // },
        // '&:hover .MuiTypography-root, & .MuiListItemIcon-root': {
        //     color: (theme) => theme.palette.mode === 'dark' ? "custom.contrastTextStrong" : 'text.custom.theme',
        // },
        '&:hover .MuiListItemSecondaryAction-root svg': {
            color: "error.light"
        },
    },
    appointmentsDateBox: {
        py: 0,
        display: "flex",
        flexDirection: "column",
    },
    listItemText: {
        width: "100%",
        height: "100%",
        pl: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end"
    },
    appointmentsToday: {
        color: "primary",
    },
    // paymentsDetail: {
    //     width: "100%",
    //     minHeight: "100%",
    //     display: "flex",
    //     flexDirection: "column",
    // },
    // overdue: {
    //     border: "1px solid",
    //     borderColor: "error.main",
    //     borderRadius: "4px",
    // },
    // overdueIcon: {
    //     fontSize: "32px",
    //     color: "error.main",
    //     justifySelf: "flex-end",
    //     alignSelf: "center",
    // },
}