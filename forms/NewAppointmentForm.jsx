import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import userContext from '../utility/appContext'
import { useTheme } from '@mui/material/styles'
import ThemeContext from '../utility/themeContext'
import localForage from 'localforage'

// Import components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DatePicker from '@mui/lab/DatePicker'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FeatureBox from '../components/featureBox'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Toast from '../components/toast'
import Typography from '@mui/material/Typography'

// Import icons
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import CloseIcon from '@mui/icons-material/Close'
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'

// Import date functions
import addMinutes from 'date-fns/addMinutes'
import addMonths from 'date-fns/addMonths'
import format from 'date-fns/format'
import formatISO from 'date-fns/formatISO'
import isWeekend from 'date-fns/isWeekend'

// Define Yup validation schema
const validationSchema = yup.object().shape({
    service: yup.string()
        .required("Please select a service"),
    date: yup.date()
        .required('Date is required')
        .max(addMonths(new Date(), 3), 'Date must within 3 months from today')
        .min(new Date(), 'Date must be in the future')
        .typeError('Date must be a valid date'),
})

const NewAppointmentForm = ({ client }) => {
    // Get businessId from url
    const router = useRouter()
    const businessId = router.query.businessId

    // Access user data
    const userData = useContext(userContext)

    // Access theme context
    const theme = useTheme(ThemeContext)

    // Set up form hook
    const { control, handleSubmit, formState: { errors }, getValues, watch } = useForm({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
        defaultValues: {

        }
    })
    const [watchService, watchDate] = watch(['service', 'date'])

    // State management
    const [services, setServices] = useState(null)
    const [needRefresh, setNeedRefresh] = useState(false)
    const [availableTimeSlots, setAvailableTimeSlots] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)
    const [confirmDialog, setConfirmDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState(null)

    // Get selected service data
    const selectedService = services?.find(service => service.name === watchService)
    
    // Get services and populate the related select options
    useEffect(() => {
        // Define function to get services
        const requestHandler = async () => {
            try {
                // No spinner is used here because loading data to a select box is expected to be fast
                // Messaging on failure will still be in place

                // Request services
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/businesses/services/${businessId}`, {
                    headers: {
                        'Authorization': `Bearer ${await localForage.getItem('accessToken')}`
                    }
                })
                const data = await response.json()

                // Throw error if response failed
                if (!response.ok) {
                    throw {
                        status: data.status,
                        message: data.message
                    }
                }
                
                // Request was successful, set services
                setServices(data.services)

            } catch (error) {
                console.log(error)

                // Inform user of error
                setResponseMessage({
                    status: error.status,
                    message: "Error: Failed to get services",
                    severity: "error"
                })
            }
        }

        // Send request to get services if businessId is set
        if(businessId) requestHandler()
    }, [businessId])

    // Handle request for appointment times
    useEffect(() => {
        // Define function to get available appointment times
        const requestHandler = async () => {
            try {
                // Start spinner
                setIsLoading(true)
                
                // Get service id and date string
                const serviceId = services.filter(service => service.name === watchService)[0]._id
                // Date string explicitly sets time to 00:00:00 with ISO timezone to avoid timezone issues
                const date = `${format(watchDate, "yyyy-MM-dd")}T00:00:00.000${watchDate.getTimezoneOffset() > 0 ? '-' : '+'}${Math.abs(watchDate.getTimezoneOffset()) / 60 * 100}`

                // Request available appointment times
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/appointment-times/${businessId}/${serviceId}/${date}`)
                const data = await response.json()

                // Throw error if response failed
                if (!response.ok) {
                    throw {
                        status: response.status,
                        message: response.statusText
                    }
                }

                // Stop spinner
                setIsLoading(false)

                // Request was successful, set available appointment times
                // Don't inform the user of success as success is assumed
                setAvailableTimeSlots(data.times)

            } catch (error) {
                console.log(error)
    
                // Stop spinner
                setIsLoading(false)
    
                // Inform user of error
                setResponseMessage({
                    status: error.status,
                    message: "Error: Failed to get available appointment times",
                    severity: "error"
                })
            }
        }

        // Call function to get available appointment times if businessId, service and date are set without errors
        if(businessId && services && watchService && watchDate && !errors.service && !errors.date) {
            requestHandler()
        }
    }, [businessId, watchService, watchDate, needRefresh])


    // Handle request to create appointment
    const handleAddAppointment = async (timeSlot) => {
        const requestHandler = async () => {
            try {
                // Start spinner
                setIsLoading(true)

                // Define URL for request based on userType as operations are different for user and busniessRep
                let requestURL
                if(userData.userType === 'user'){
                   requestURL = `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/user/${businessId}`
                } else if(userData.userType === 'businessRep'){
                    // Check that clientId is set
                    if(!client.user._id){
                        throw {
                            status: "error",
                            message: "Error: No client selected"
                        }
                    }
                    requestURL = `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/business-rep/${businessId}/${client.user._id}`
                }

                // Send request to create appointment
                const response = await fetch(requestURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${await localForage.getItem('accessToken')}`
                    },
                    body: JSON.stringify({
                        crm: client?._id || userData.user._id,
                        service: selectedService._id,
                        appointmentTime: timeSlot,
                        appointmentEnd: addMinutes(new Date(timeSlot), selectedService.duration + selectedService.break),
                        fee: selectedService.fee,
                        feeDue: timeSlot,
                        paymentStatus: 'unpaid'
                    })
                })
                const data = await response.json()
                
                // Stop spinner
                setIsLoading(false)

                // Throw error if response failed
                if (response.status !== 201) {
                    throw {
                        status: data.status,
                        message: data.message
                    }
                }

                // Request was successful, update available appointment times and inform the user
                setNeedRefresh(!needRefresh)
                setSelectedTime(null)
                setResponseMessage({
                    status: data.status,
                    message: data.message,
                    severity: "success"
                })

            } catch(error) {
                console.log(error)

                // Stop spinner
                setIsLoading(false)
                
                // Inform user of error
                setResponseMessage({
                    status: error.status,
                    message: error.message,
                    severity: "error"
                })
            }
        }

        requestHandler()
    }

  return (
      <Box sx={styles.cont} >
        <Box sx={styles.formContainer} as="form">
            <Box sx={styles.form} >
                { services && (
                    <Controller
                        name="service"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <FormControl sx={styles.services} error={!!errors.service} >
                                <InputLabel sx={styles.servicesInputLabel} id="services-select-label">Services</InputLabel>
                                <Select 
                                    labelId="services-select-label"  
                                    autoWidth={true}
                                    input={<OutlinedInput label="Services" />}
                                    MenuProps={{ PaperProps: { sx: { minWidth: "40%" } } }}
                                    { ...field }
                                >
                                    {services.map(service => (
                                        <MenuItem key={service.name} value={service.name}>{service.name}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText error={!!errors.service}>{ !!errors.service && errors.service.message }</FormHelperText>
                            </FormControl>
                        )}
                    />
                )}

                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            name="date"
                            label="Appointment Date"
                            shouldDisableDate={isWeekend}
                            inputFormat="dd/MM/yyyy"
                            {...field}
                            renderInput={(params) => <TextField 
                                {...params}
                                sx={styles.datepicker}
                                error={!!errors.date}
                                helperText={errors.date && errors?.date?.message}
                            />}
                        />
                    )}
                />

            </Box>

            { !userData.loggedIn && (
                <Typography sx={styles.loginMessage} variant="body2">*Log in to book an appointment</Typography>
            )}

            <FeatureBox
                title="Available Times"
                iconLeft={<EventAvailableRoundedIcon />}
            >
                <Box sx={styles.featureContent}>
                    {/* Render if no valid service or date selected */}
                    { availableTimeSlots === null && (
                        <Typography variant="body1" >Please select a service and date to display available appointment times.</Typography>
                    ) }

                    {/* Render if no time slots available */}
                    { (availableTimeSlots && availableTimeSlots.length === 0) && (
                        <Typography variant="body1" >There are no available appointment times on this day.</Typography>
                    )}

                    {/* Render available time slots */}
                    { availableTimeSlots && availableTimeSlots.length > 0 && (
                        <>
                            <List>
                                {/* Clickable when logged in */}
                                {userData.loggedIn && availableTimeSlots.map(timeSlot => (
                                    <ListItemButton 
                                        key={timeSlot} 
                                        sx={styles.timeSlot} 
                                        divider={true}
                                        onClick={() => {setConfirmDialog(true); setSelectedTime(timeSlot)}}
                                    >
                                        <ListItemIcon>
                                            <AccessTimeRoundedIcon />                                
                                        </ListItemIcon>
                                        <ListItemText primary={ `${format(new Date(timeSlot), "H:mm aaa")}  - ${ format(addMinutes(new Date(timeSlot), selectedService.duration + selectedService.break), "H:mm aaa") }` }/>
                                    </ListItemButton>
                                ))}

                                {/* Not clickable when not logged in */}
                                { !userData.loggedIn && availableTimeSlots.map(timeSlot => (
                                    <ListItem key={timeSlot} sx={styles.timeSlot} divider={true}>
                                        <ListItemIcon>
                                            <AccessTimeRoundedIcon />                                
                                        </ListItemIcon>
                                        <ListItemText primary={ `${format(new Date(timeSlot), "H:mm aaa")}  - ${ format(addMinutes(new Date(timeSlot), selectedService.duration + selectedService.break), "H:mm aaa") }` }/>
                                    </ListItem>
                                ))}
                            </List>
                        </>
                    )}
                </Box>
            </FeatureBox>
        </Box>
        
        <Toast response={responseMessage} setResponse={setResponseMessage} hideIn={6000} />

        {/* Confirm create appointment dialog */}
        {/* This will not be available if user is not logged in */}
        {userData.loggedIn && (
            <Dialog fullWidth open={confirmDialog} onClose={() => {setConfirmDialog(false); setSelectedTime(null)}}>
                <DialogTitle variant="h4" align="center">
                    Confirm Appointment
                    <IconButton
                        aria-label="close"
                        onClick={() => {setConfirmDialog(false); setSelectedTime(null)}}
                        sx={styles.closeButton}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Please confirm that the details below are correct to book this appointment.</Typography>
                    <Typography variant="caption"></Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={() => {handleSubmit(handleAddAppointment(selectedTime)); setConfirmDialog(false) }}>Confirm</Button>
                    <Button variant="outlined" onClick={() => {setConfirmDialog(false); setSelectedTime(null)}}>Cancel</Button>
                </DialogActions>
            </Dialog>
        )}

    </Box>
  )
}

export default NewAppointmentForm

const styles = {
    cont: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    formContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "90%",
        mt: 3,
        display: "flex",
        justifyContent: "space-between",
        minWidth: 360,
    },
    servicesInputLabel: {
        color: 'custom.contrastTextStrong'
    },
    services: {
        width: "45%",
        mt: 2,
    },
    datepicker: {

        width: "45%",
        mt: 2,
        mb: 1,
    },
    loginMessage: {
        mt: 1,
        ml: 4,
        alignSelf: "flex-start",
    },
    featureContent: {
        height: "450px",
        overflowY: "scroll",
        px: 3,
        pb: 2,
        '& .MuiTypography-root, & .MuiListItemIcon-root': {
            color: (theme) => theme.palette.mode === 'dark' ? "custom.contrastText" : 'text.custom.highlight',
        }
    },
    timeSlot: {
        py: 2,
    },
    closeButton: {
        position: 'absolute',
        right: 8,
        top: 8,
        color: "custom.constrastText",
    }
}