import { useState, useEffect } from "react"

// Import componenets
import Box from '@mui/material/Box'
import FloatingDialog from "../components/FloatingDialog"
import IconButton from "@mui/material/IconButton"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Spinner from './spinner'
import Typography from '@mui/material/Typography'

// Import icons
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

// Import date functions
import format from 'date-fns/format'
import isPast from 'date-fns/isPast'
import isSameDay from "date-fns/isSameDay"
import isSameMonth from "date-fns/isSameMonth"

const AppointmentList = ({ dataMode, userData, businessId, pickedDate, returnAppointmentDates, setResponseMessage, deletable }) => {

    // Initalise props
    const dataModes = ['upcoming', 'historical', 'sameDay']
    if(!dataMode) {
        dataMode = 'upcoming'
    } else if(dataModes.includes(dataMode)) {
        dataMode = dataMode
    } else {
        throw new Error(`Invalid dataMode in AppointmentList component: ${dataMode}`)
    }

    if(deletable === undefined) {
        deletable = true
    } else {
        deletable = !!deletable
    }

    // Render method for delete icon
    const deleteIcon = (appointment) => {
        if(deletable) {
            return (
                <IconButton onClick={() => setDeleteDialog([true, appointment._id]) }>
                    <DeleteForeverRoundedIcon fontSize="20px" />
                </IconButton>
            )
        } else {
            return null
        }
    }

    // State Management
    const [crmData, setCrmData] = useState(null)
    const [appointments, setAppointments] = useState(null)
    const [deleteDialog, setDeleteDialog] = useState([false, null])
    const [needRefresh, setNeedRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Flag appointment list for refresh if picked date changes (only applicable for calendar page)
    useEffect(() => {
        if(pickedDate) {
            setNeedRefresh(!needRefresh)
        }
    }, [pickedDate])

    // Get appointments for the logged in user
    useEffect(() => {
        // Define a function to handle the request for user appointments
        const requestHandler = async () => {
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

                // Build the appointment array into the required format
                const getAppointments = data.data.map(crm => {
                    crm.appointments.map(appt => {
                        appt.clientName = `${crm.user.fname} ${crm.user.lname}`
                        appt.businessName = crm.business.name
                        appt.service = crm.business.services.find(service => service._id === appt.service)
                        return appt
                    })
                    return crm.appointments
                }).flat()
                
                // Filter appointments according to dataMode
                let filteredAppointments
                if(dataMode === 'upcoming') {
                    filteredAppointments = getAppointments.filter(appointment => (!isPast(new Date(appointment.appointmentTime))))
                } else if(dataMode === 'sameDay') {
                    filteredAppointments = getAppointments.filter(appointment => isSameDay(new Date(appointment.appointmentTime), new Date(pickedDate)))
                } else if(dataMode === 'historical') {
                    filteredAppointments = getAppointments.filter(appointment => isPast(new Date(appointment.appointmentTime)))
                }

                // Sort appointments by date and time (ascending)
                const sortedAppointments = filteredAppointments?.sort((a, b) => new Date(a.appointmentTime) - new Date(b.appointmentTime))

                // Set appointments to state
                setAppointments(sortedAppointments)

                // Return appointment dates if requested
                if(returnAppointmentDates) {
                    const appointmentsInCurrentMonth = getAppointments.filter(appointment => isSameMonth(new Date(appointment.appointmentTime), new Date(pickedDate)))
                    returnAppointmentDates(appointmentsInCurrentMonth.map(appointment => appointment.appointmentTime))
                }

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

    }, [userData, businessId, needRefresh])


     // Handle delete appointment
     const deleteAppointment = async (appointmentId) => {
        try {
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
            setNeedRefresh(!needRefresh)

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
            <List sx={styles.itemList}>
                { appointments && appointments.map(appointment => (
                        <ListItem
                            sx={styles.listItem} 
                            key={appointment._id}
                            secondaryAction={ deleteIcon(appointment) }
                            disablePadding
                            divider
                        >
                            <ListItemButton
                                disableGutters
                                disabled={isPast(new Date(appointment.appointmentTime))}
                                key={`_${appointment._id}`}
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
                    )
                )}

                {/* If there are no appointments, display a message */}
                { (!appointments || appointments.length === 0) && (
                    <ListItem sx={styles.listItem} key={"no-data"}>
                        { dataMode === 'upcoming' && (
                            <Typography variant="body1" align='center'>You have no upcoming appointments. Check the services tab to book an appointment.</Typography>
                        )}

                        { dataMode === 'sameDay' && (
                            <Typography variant="body1" align='center'>You have no appointments on this day. Check the services tab to book an appointment.</Typography>
                        )}

                        { dataMode === 'historical' && (
                            <Typography variant="body1" align='center'>You haven&apos;t attended any appointments yet. Check the services tab to book an appointment.</Typography>
                        )}
                    </ListItem>
                )}
            </List>

            <Spinner open={isLoading} />

            <FloatingDialog 
                open={deleteDialog[0]}
                onClose={() => setDeleteDialog([false, null])}
                type="delete"
                onConfirm={() => deleteAppointment(deleteDialog[1])}
            >
                <Typography variant="body1">Please confirm that you would like to delete this appointment.</Typography>
                <Typography variant="caption"  color="error">Warning: This action is permanent. Any data deleted will be unrecoverable.</Typography>
            </FloatingDialog>
        </>
    )
}

export default AppointmentList

const styles = {
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
}