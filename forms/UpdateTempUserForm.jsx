import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import subYears from 'date-fns/subYears'
import isWeekend from 'date-fns/isWeekend'
import { buildUserForm } from '../utility/helperFunctions'
import localForage from 'localforage'

// Styles, UI, UX
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DatePicker from '@mui/lab/DatePicker'
import InputAdornment from '@mui/material/InputAdornment'
import Spinner from '../components/spinner'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded'
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import SignpostRoundedIcon from '@mui/icons-material/SignpostRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import PublicRoundedIcon from '@mui/icons-material/PublicRounded'


// Define schema for form validation
const validationSchema = yup.object().shape({
    fname: yup.string()
        .required('First name is required')
        .matches(/^[a-zA-Z]+$/, 'First name must only contain letters')
        .min(2, 'First name must have at least 2 characters')
        .max(50, 'First name must have less than 50 characters'),
    lname: yup.string()
        .required('Last name is required')
        .matches(/^[a-zA-Z]+$/, 'Last name must only contain letters')
        .min(2, 'Last name must have at least 2 characters')
        .max(50, 'Last name must have less than 50 characters'),
    email: yup.string()
        .required('Email is required')
        .email('Email must be valid'),
    phone: yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]+$/, 'Phone number must only contain numbers')
        .min(8, 'Phone number must have at least 8 digits')
        .max(10, 'Phone number must have 10 digits or less'),
    dob: yup.date()
        .optional()
        .max(new Date(), 'Date of birth must be in the past')
        .min(subYears(new Date(), 120), 'Date of birth must be within the last 120 years')
        .typeError('Date of birth must be a valid date'),
    unit: yup.string()
        .optional()
        .matches(/^[0-9]*$/, 'Unit must only contain numbers')
        .min(0, 'Unit must have at least 1 digit')
        .max(4, 'Unit must have 4 digits or less'),
    streetNumber: yup.string()
        .optional()
        .matches(/^[0-9]*$/, 'Street number must only contain numbers')
        .min(0, 'Street number must have at least 1 digit')
        .max(6, 'Street number must have 6 digits or less'),
    streetName: yup.string()
        .optional()
        .matches(/^[a-zA-Z0-9\s'-]*$/, 'Street name must only contain letters, numbers, spaces, hyphens, and apostrophes')
        .min(0, 'Street name must have at least 2 characters')
        .max(50, 'Street name must have less than 50 characters'),
    city: yup.string()
        .optional()
        .matches(/^[a-zA-Z\s'-]*$/, 'City must only contain letters, spaces, hyphens, and apostrophes')
        .min(0, 'City must have at least 2 characters')
        .max(50, 'City must have less than 50 characters'),
    state: yup.string()
        .optional()
        .matches(/^[a-zA-Z\s'-]*$/, 'State must only contain letters, spaces, hyphens, and apostrophes')
        .min(0, 'State must have at least 2 characters')
        .max(50, 'State must have less than 50 characters'),
    postCode: yup.string()
        .optional()
        .matches(/^[0-9-]*$/, 'Postcode must only contain numbers and hyphens')
        .min(0)
        .max(4, 'Postcode must be less than 5 digits long'),
    country: yup.string()
        .optional()
        .matches(/^[a-zA-Z\s'-]*$/, 'Country must only contain letters, spaces, hyphens, and apostrophes')
        .min(0, 'Country must have at least 2 characters')
        .max(50, 'Country must have less than 50 characters'),
})

export default function UpdateUserForm({ refreshClientList, closeDialog, businessId, setResponseMessage, userData }) {
    const user = userData.user
    // State management
    const { handleSubmit, control, formState: { errors }, getValues } = useForm({ 
        mode: "onChange", 
        resolver: yupResolver(validationSchema),
        defaultValues: {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            phone: user.phone,
            dob: user.dob,
            unit: user.address?.unit,
            streetNumber: user.address?.streetNumber,
            streetName: user.address?.streetName,
            city: user.address?.city,
            state: user.address?.state,
            postCode: user.address?.postCode,
            country:  user.address?.country
        } 
    })
    const [isLoading, setIsLoading] = useState(false)

    // Handle form submission
    const handleUpdate = () => {
        // Set up request handler as function so we can call it conditionally
        const requestHandler = async () => {
            // No need to prevent default as that is handled by react-hook-form
            // Start spinner
            setIsLoading(true)

            // Convert form data into the expected format
            const form = buildUserForm(getValues())
            if(form.dob === "1970-00-00") {
                form.dob = null
            }

            // Send fetch request to server's update user route
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/temp-users/${businessId}/${user._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${await localForage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(form)
                })

                const data = await response.json()
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
                    refreshClientList()

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
        console.log(businessId)
        // Send request if businessId populated
        if(businessId) requestHandler()
    }

    return (
        <>
            <Box as="form" sx={styles.form} onSubmit={handleSubmit(handleUpdate)}>
                <Controller
                    name="fname"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            sx={styles.formItem}
                            fullWidth
                            name="fname" 
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><AccountCircleIcon /></InputAdornment>)}}
                            type="text"
                            placeholder="First Name"
                            { ...field }
                            error={!!errors.fname}
                            helperText={errors.fname && errors?.fname?.message}
                        />
                    )}
                />
                <Controller
                    name="lname"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            sx={styles.formItem}
                            fullWidth
                            name="lname" 
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><AccountCircleIcon /></InputAdornment>)}}
                            type="text"
                            placeholder="Last Name"
                            {...field}
                            error={!!errors.lname}
                            helperText={errors.lname && errors?.lname?.message}
                        />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            sx={styles.formItem}
                            fullWidth
                            name="email"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><AlternateEmailRoundedIcon /></InputAdornment>)}}
                            type="email"
                            placeholder="Email"
                            {...field}
                            error={!!errors.email}
                            helperText={errors.email && errors?.email?.message}
                        />
                    )}
                />
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="phone"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><LocalPhoneRoundedIcon /></InputAdornment>)}}
                            type="text"
                            placeholder="Phone"
                            {...field}
                            error={!!errors.phone}
                            helperText={errors.phone && errors?.phone?.message}
                        />
                    )}
                />
                <Controller
                    name="dob"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            name="dob"
                            label="Date of Birth (optional)"
                            shouldDisableDate={isWeekend}
                            inputFormat="dd/MM/yyyy"
                            {...field}
                            renderInput={(params) => <TextField 
                                {...params}
                                sx={{ ...styles.formItem, width: "100%", mb: 1 }}
                                error={!!errors.dob}
                                helperText={errors.dob && errors?.dob?.message}
                            />}
                        />
                    )}
                />
                
                <Typography sx={{ ...styles.formItem, width: "100%" }} variant="body1" align="left">Address (optional):</Typography>
                <Controller
                    name="unit"
                    control={control}
                    render={({ field }) => (
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="unit"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><ApartmentRoundedIcon /></InputAdornment>)}}
                            type="text"
                            placeholder="Unit"
                            {...field}
                            error={!!errors.unit}
                            helperText={errors.unit && errors?.unit?.message}
                        />
                    )}
                />
                <Controller
                    name="streetNumber"
                    control={control}
                    render={({ field }) => (
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="streetNumber"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><HomeRoundedIcon /></InputAdornment>)}}
                            type="text"
                            placeholder="Street Number"
                            {...field}
                            error={!!errors.streetNumber}
                            helperText={errors.streetNumber && errors?.streetNumber?.message}
                        />
                    )}
                />
                <Controller
                    name="streetName"
                    control={control}
                    render={({ field }) => (
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="streetName"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><SignpostRoundedIcon /></InputAdornment>)}}
                            type="text"
                            placeholder="Street Name"
                            {...field}
                            error={!!errors.streetName}
                            helperText={errors.streetName && errors?.streetName?.message}
                        />
                    )}
                />
                <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="city"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><LocationOnRoundedIcon /></InputAdornment>)}}
                            type="text"
                            placeholder="City"
                            {...field}
                            error={!!errors.city}
                            helperText={errors.city && errors?.city?.message}
                        />
                    )}
                />
                <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                        <TextField 
                        sx={styles.formItem}
                        fullWidth
                        name="state"
                        InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><LocationOnRoundedIcon /></InputAdornment>)}}
                        type="text"
                        placeholder="State/Province"
                        {...field}
                        error={!!errors.state}
                        helperText={errors.state && errors?.state?.message}
                    />
                    )}
                />
                <Controller
                    name="postCode"
                    control={control}
                    render={({ field }) => (
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="postCode"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><LocationOnRoundedIcon /></InputAdornment>)}}
                            type="text"
                            placeholder="Postcode"
                            {...field}
                            error={!!errors.postCode}
                            helperText={errors.postCode && errors?.postCode?.message}
                        />
                    )}
                />
                <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                        <TextField 
                            sx={{...styles.formItem, width: "100%", mb: 1 }}
                            name="country"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><PublicRoundedIcon /></InputAdornment>)}}
                            type="text"
                            placeholder="Country"
                            {...field}
                            error={!!errors.country}
                            helperText={errors.country && errors?.country?.message}
                        />
                    )}
                />
                <Button 
                    sx={styles.formItem}
                    fullWidth 
                    type="submit" 
                    variant="contained"
                >
                    Update
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
    userToggle: {
        width: "100%",
        // display: "flex",
        // justifyContent: "space-between",
    },
    formItem: {
        mt: 1,
    },
    inputIcon: {
        color: "custom.contrastText",
    },
    spinDialog: {
        backgroundImage: (theme) => theme.palette.custom.gradient.medium
    },
    spinStyle: {
        m: 6,
    }
}