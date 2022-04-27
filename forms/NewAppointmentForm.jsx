import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Import components
import Box from '@mui/material/Box'
import DatePicker from '@mui/lab/DatePicker'
import FeatureBox from '../components/featureBox'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Toast from '../components/toast'

// Import icons
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'

// Import date functions
import isWeekend from 'date-fns/isWeekend'
import addMonths from 'date-fns/addMonths'

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

const NewAppointmentForm = () => {
    // Get businessId from url
    const router = useRouter()
    const businessId = router.query.businessId

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
    const [isLoading, setIsLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState(null)
    console.log("SERVICES: ", services)
    
    // Get services and populate the related select options
    useEffect(() => {
        console.log("GET SERVICES")

        // Define function to get services
        const requestHandler = async () => {
            try {
                // No spinner is used here because loading data to a select box is expected to be fast
                // Messaging on failure will still be in place

                // Request services
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/businesses/services/${businessId}`, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
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
                console.log(serviceId)
                const date = watchDate.toISOString().split('T')[0]
                console.log("REQUEST INPUTS: ", serviceId, date)
                // Request available appointment times
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/appointment-times/${businessId}/${serviceId}/${date}`, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                    }
                })
                const data = await response.json()
                console.log("RES + DATA: ", response, data)
                // Throw error if response failed
                if (!response.ok) {
                    throw {
                        status: response.status,
                        message: response.statusText
                    }
                }

                // Request was successful, set available appointment times
                console.log("APPT TIMES: ", data)

            } catch (error) {
                console.log(error)
    
                // Stop spinner
                setIsLoading(false)
    
                // Inform user of error
                // setResponseMessage({
                //     status: error.status,
                //     message: "Error: Failed to get available appointment times",
                //     severity: "error"
                // })
            }
        }


        console.log("WATCHSTATE: ", watchService, watchDate, "BUSINESS ID: ", businessId, "ERRORS: ", errors)
        // Call function to get available appointment times if businessId, service and date are set without errors
        if(businessId && services && watchService && watchDate && !errors.service && !errors.date) {
            requestHandler()
        }
    }, [businessId, watchService, watchDate])

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
            <FeatureBox
                title="Available Times"
                iconLeft={<EventAvailableRoundedIcon />}
            >
                <Box sx={styles.featureContent}>
                    {/* Render if no valid service or date selected */}
                    { }

                    {/* Render if no time slots available */}

                    {/* Render available time slots */}
                </Box>
            </FeatureBox>
        </Box>
        <Toast response={responseMessage} setResponse={setResponseMessage} hideIn={6000} />
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
    featureContent: {
        minHeight: "150px",
    }
}