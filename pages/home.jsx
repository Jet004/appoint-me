import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import userContext from '../utility/mockData/appContext'
// import AppointmentDetail from '../components/AppointmentDetail' // This is not implmented yet

// Components
import Alert from '@mui/material/Alert' // This is not implemented at present - will be used to display overdue payment messages
import AppointmentList from '../components/appointmentList'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import FeatureBox from '../components/featureBox'
import Layout from '../layout/layout'
import List from '@mui/material/List' // This is not implmented yet
import ListItemButton from '@mui/material/ListItemButton' // This is not implmented yet
import Spinner from '../components/spinner'
import Toast from '../components/toast'
import Typography from '@mui/material/Typography' // This is not implmented yet

// Import icons
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded' // This is not implemented at present - will be used to display payment related icons
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded' // This is not implemented at present - will be used to display payment related icons


export default function Home() {
    // Allow access to user data
    const userData = useContext(userContext)

    // State Management
    const [businessId, setBusinessId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState(null)
    // const [appointmentDetailDialog, setAppointmentDetailDialog] = useState(false) // This is not implemented at present - will be used to display appointment detail dialog

    // Get businessId if user is of type businessRep
    useEffect(() => {
        const requestHandler = async () => {
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
                        <AppointmentList
                            userData={userData}
                            businessId={businessId}
                            setIsLoading={setIsLoading}
                            setResponseMessage={setResponseMessage}
                        />
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