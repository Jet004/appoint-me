import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import localForage from 'localforage'

// Styles, UI, UX
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import Spinner from '../components/spinner'
import TextField from '@mui/material/TextField'

// Icons
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import FreeBreakfastRoundedIcon from '@mui/icons-material/FreeBreakfastRounded'
import SellRoundedIcon from '@mui/icons-material/SellRounded'


// Define schema for form validation
const validationSchema = yup.object().shape({
    name: yup.string()
        .required('Service name is required')
        .matches(/^[a-zA-Z !@*$-_]+$/, 'Service name must only contain letters')
        .min(2, 'Service name must have at least 2 characters')
        .max(50, 'Service name must have less than 50 characters'),
    description: yup.string()
        .required('Description is required')
        .matches(/^[a-zA-Z .,:!@()-_]+$/, 'Description must only contain letters')
        .min(2, 'Description must have at least 2 characters')
        .max(1000, 'Description must have less than 1000 characters'),
    duration: yup.number()
        .required('Duration is required')
        .min(5, 'Duration must be at least 5 minutes long')
        .max(600, 'Duration must be less than 600 minutes long')
        .positive('Duration must be a positive number')
        .truncate()
        .integer('Duration must be an integer'),
    break: yup.number()
        .optional()
        .min(0, 'Break must be at least 5 minutes long')
        .max(300, 'Break must be less than 600 minutes long')
        .positive('Break must be a positive number')
        .truncate()
        .integer('Break must be an integer'),
    fee: yup.number()
        .required('Fee is required')
        .min(1, 'Fee must be at least 1 dollar')
        .max(10000, 'Fee must be less than 10,000 dollars')
        .positive('Fee must be a positive number'),
})

export default function UpdateUserForm({ serviceData, refreshServiceList, closeDialog, businessId, setResponseMessage }) {
    // State management
    const { handleSubmit, control, formState: { errors }, getValues } = useForm({ 
        mode: "onChange", 
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: serviceData.name,
            description: serviceData.description,
            duration: serviceData.duration,
            break: serviceData.break,
            fee: serviceData.fee,
        } 
    })
    const [isLoading, setIsLoading] = useState(false)

    // Handle form submission
    const submitUpdatedService = () => {
        // Set up request handler as function so we can call it conditionally
        const requestHandler = async () => {
            // No need to prevent default as that is handled by react-hook-form
            // Start spinner
            setIsLoading(true)

            // Get form data
            const form = getValues()

            // Send fetch request to server's update user route
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/businesses/services/${businessId}/${serviceData._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${await localForage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(form)
                })
                const data = await response.json()
                console.log("RESPONSE: ", response, data)
                    // Throw error if request failed
                    if(data.status !== "success") {
                        console.log(response)
                        throw {
                            status: data.status,
                            message: data.message,
                        }
                    }

                    // Stop spinner
                    setIsLoading(false)

                    // Request was successful, inform the user
                    setResponseMessage({
                        status: data.status,
                        message: data.message,
                        severity: "success"
                    })

                    // Force client list to refresh
                    refreshServiceList()
                    // Close dialog
                    if(closeDialog) {
                        closeDialog()
                    }
                    
            } catch(err){
                // Log the error to console then show user the error message
                console.log(err)

                // Stop spinner
                setIsLoading(false)

                setResponseMessage({
                    status: err.status, 
                    message: err.message, 
                    severity: "error"
                })  
            }
        }
        
        // Send request if businessId populated
        if(businessId && serviceData._id) requestHandler()
    }

    return (
        <>
            <Box as="form" sx={styles.form} onSubmit={handleSubmit(submitUpdatedService)}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            sx={styles.formItem}
                            fullWidth
                            name="name"
                            label="Service name"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><WorkRoundedIcon /></InputAdornment>)}}
                            type="text"
                            placeholder="Service Name"
                            { ...field }
                            error={!!errors.name}
                            helperText={errors.name && errors?.name?.message}
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            sx={styles.formItem}
                            fullWidth
                            multiline
                            minRows={4}
                            name="description"
                            label="Description"
                            InputProps={{startAdornment: (<InputAdornment sx={{ ...styles.inputIcon, ...styles.description }} position="start"><DescriptionRoundedIcon /></InputAdornment>)}}
                            type="text"
                            placeholder="Description"
                            {...field}
                            error={!!errors.description}
                            helperText={errors.description && errors?.description?.message}
                        />
                    )}
                />
                <Controller
                    name="duration"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            sx={styles.formItem}
                            fullWidth
                            name="duration"
                            label="Duration"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><AccessTimeRoundedIcon /></InputAdornment>)}}
                            type="duration"
                            placeholder="Duration"
                            {...field}
                            error={!!errors.duration}
                            helperText={errors.duration && errors?.duration?.message}
                        />
                    )}
                />
                <Controller
                    name="break"
                    control={control}
                    render={({ field }) => (
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="break"
                            label="Break"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><FreeBreakfastRoundedIcon /></InputAdornment>)}}
                            type="text"
                            placeholder="Break"
                            {...field}
                            error={!!errors.break}
                            helperText={errors.break && errors?.break?.message}
                        />
                    )}
                />
                
                <Controller
                    name="fee"
                    control={control}
                    render={({ field }) => (
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="fee"
                            label="Fee"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><SellRoundedIcon /></InputAdornment>)}}
                            type="text"
                            placeholder="Fee"
                            {...field}
                            error={!!errors.fee}
                            helperText={errors.fee && errors?.fee?.message}
                        />
                    )}
                />
                <Button 
                    sx={styles.formItem}
                    fullWidth 
                    type="submit" 
                    variant="contained"
                >
                    Update Service
                </Button>
            </Box>
            <Spinner open={isLoading} dialogStyle={styles.spinDialog} spinStyle={styles.spinStyle} />
        </>
    )
}


const styles = {
    form: {
        mt: 3,
        display: "flex",
        flexWrap: "wrap",
    },
    formItem: {
        mt: 1,
    },
    inputIcon: {
        color: "custom.contrastText",
    },
    description: {
        mt: 1.25,
        alignSelf: "flex-start",
    },
    spinDialog: {
        backgroundImage: (theme) => theme.palette.custom.gradient.medium
    },
    spinStyle: {
        m: 6,
    }
}