import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { useTheme } from '@mui/material/styles'
import ThemeContext from '../utility/themeContext'
import userContext from '../utility/appContext'
import localForage from 'localforage'

// Components
import AppointmentList from '../components/AppointmentList'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import CalendarPicker from '@mui/lab/CalendarPicker'
import Container from '@mui/material/Container'
import DatePicker from '@mui/lab/DatePicker'
import FeatureBox from '../components/featureBox'
import Layout from '../layout/layout'
import PickersDay from '@mui/lab/PickersDay'
import Spinner from '../components/spinner'
import TextField from '@mui/material/TextField'
import Toast from '../components/toast'

// Icons
import CalendarViewDayRoundedIcon from '@mui/icons-material/CalendarViewDayRounded'
// import CalendarViewWeekRoundedIcon from '@mui/icons-material/CalendarViewWeekRounded' // Not implemented yet
import CalendarViewMonthRoundedIcon from '@mui/icons-material/CalendarViewMonthRounded'

// Import date functions
import isSameDay from 'date-fns/isSameDay'
import isWeekend from 'date-fns/isWeekend'


export default function Appointments() {
    // Get user data
    const userData = useContext(userContext)

    // Access theme variables
    const theme = useTheme(ThemeContext)

    // Initialise view list
    const views = [
        {
            type: 'day', 
            icon: <CalendarViewDayRoundedIcon fontSize="small" />
        }, 
        {
            type: 'month', 
            icon: <CalendarViewMonthRoundedIcon fontSize="small" />
        }
    ]

    const [viewState, setViewState] = useState("day")
    const [pickedDate, setPickedDate] = useState(new Date())
    const [appointmentDates, setAppointmentDates] = useState(null)
    const [businessId, setBusinessId] = useState(null)
    const [responseMessage, setResponseMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

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
                        'Authorization': `Bearer ${await localForage.getItem('accessToken')}`
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

                // Stop spinner
                setIsLoading(false)
                
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
            <title>AppointMe: Calendar</title>
        </Head>
        <Layout page="Calendar">
            <Container sx={styles.cont}>
                <Box sx={styles.outerBox}>
                    <FeatureBox
                        headerProps={styles.headerProps}
                        noDivider
                        title={(
                            <Box  sx={styles.calendarHead}>
                                <ButtonGroup sx={styles.viewGroup} size="small" color="contrast">
                                    { views.map(view => (
                                        <Button key={view.type} sx={styles.viewButton(viewState === view.type)} onClick={() => setViewState(view.type)}>
                                            {view.icon}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                                {/* Display date/month picker depending on the current view */}
                                { viewState === "day" && (
                                    <DatePicker
                                        label="Date"
                                        allowSameDateSelection
                                        shouldDisableDate={isWeekend}
                                        value={pickedDate}
                                        onChange={(newDate) => {
                                            setPickedDate(newDate)
                                        }}
                                        renderInput={(params) => <TextField variant="standard" {...params} sx={styles.datePickerInput} />}
                                    />
                                )}
                                {/* { viewState === "month" && (
                                    <MonthCarosel pickedDate={pickedDate} setPickedDate={setPickedDate} />
                                )} */}
                            </Box>
                        )}
                    >
                        <Box sx={styles.appointmentListBox}>

                            {/* Day view for calendar */}
                            { viewState === "day" && (
                                <AppointmentList
                                    dataMode="sameDay"
                                    userData={userData}
                                    businessId={businessId}
                                    pickedDate={pickedDate}
                                    returnAppointmentDates={setAppointmentDates}
                                    setIsLoading={setIsLoading}
                                    setResponseMessage={setResponseMessage}
                                    deletable={false}
                                />
                            )}

                            {/* Month view for calendar */}
                            { viewState === "month" && (
                                <CalendarPicker
                                    date={pickedDate}
                                    value={pickedDate}
                                    views={["day"]}
                                    onChange={(newDate) => { setPickedDate(newDate); setViewState("day") }}
                                    shouldDisableDate={isWeekend}
                                    renderDay={(day, _value, PickersDayProps ) => {
                                        const hasAppt = appointmentDates.some(date => isSameDay(new Date(date), day))
                                        if(hasAppt) PickersDayProps.sx=styles.dayHasAppt

                                        return <PickersDay 
                                            {...PickersDayProps}
                                            allowSameDateSelection
                                        />
                                    }}
                                />
                            )}
                        </Box>
                    </FeatureBox>
                </Box>

                <Toast response={responseMessage} setResponse={setResponseMessage} />
                <Spinner open={isLoading} />

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
        flexDirection: "column",
        alignItems: "center",
    },
    headerProps: {
        pb: 1,
    },
    calendarHead: {
        width: "100%",
        minHeight: "55px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pb: 1,
    },
    viewGroup: {
        height: 35,
        mt: 1,
    },
    viewButton: (selected) => selected ? {
        backgroundImage: (theme) => theme.palette.custom.gradient.lift,
        // backgroundColor: (theme) => theme.palette.mode === 'dark' ? "#444" : theme.palette.custom.gradient.light,
    } : {},
    datePickerInput: {
        width: {xs: "50%"},
        '& label, & input, & svg': {
            color: (theme) => theme.palette.mode === 'dark' ? "custom.contrastText" : "custom.highlight",
        },
        '& .Mui-focused, & input:focus, & .Mui-focused svg': {
            color: "common.white",
        },
        '& .Mui-focused::before': {
            borderColor: (theme) => theme.palette.mode === 'dark' ? "custom.contrastText" : "custom.highlight",
        },
        '& .MuiInput-root::before': {
            borderBottom: "1px solid",
            borderColor: (theme) => theme.palette.mode === 'dark' ? "custom.contrastText" : "custom.highlight",
        },
        '& .MuiInput-root:hover::before': {
            borderBottom: "2px solid",
            borderColor: (theme) => theme.palette.mode === 'dark' ? "custom.contrastText" : "custom.highlight",
        },
    },
    appointmentListBox: {
        width: "100%",
        '& .MuiCalendarPicker-root': {
            backgroundColor: (theme) => theme.palette.mode === "dark" ? "" : "#fff",
            mb:4,
            '& .PrivatePickersSlideTransition-root': {
                minHeight: 214,
            },
        },
    },
    dayHasAppt: {
        color: "primary.main",
        border: "1px solid",
        borderColor: "primary.main",
    },
}