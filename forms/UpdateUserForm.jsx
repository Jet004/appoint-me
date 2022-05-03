import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import subYears from 'date-fns/subYears'
import isWeekend from 'date-fns/isWeekend'
import userContext from '../utility/mockData/appContext'
import { buildUserForm } from '../utility/helperFunctions'
import localForage from 'localforage'

// Styles, UI, UX
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DatePicker from '@mui/lab/DatePicker'
import InputAdornment from '@mui/material/InputAdornment'
import Spinner from '../components/spinner'
import TextField from '@mui/material/TextField'
import Toast from '../components/toast'
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
        .required('Date of birth is required')
        .max(new Date(), 'Date of birth must be in the past')
        .min(subYears(new Date(), 120), 'Date of birth must be within the last 120 years')
        .typeError('Date of birth must be a valid date'),
    unit: yup.string()
        .optional()
        .matches(/^[0-9]*$/, 'Unit must only contain numbers')
        .min(0, 'Unit must have at least 1 digit')
        .max(4, 'Unit must have 4 digits or less'),
    streetNumber: yup.string()
        .required('Street number is required')
        .matches(/^[0-9]+$/, 'Street number must only contain numbers')
        .min(1, 'Street number must have at least 1 digit')
        .max(6, 'Street number must have 6 digits or less'),
    streetName: yup.string()
        .required('Street name is required')
        .matches(/^[a-zA-Z0-9\s'-]+$/, 'Street name must only contain letters, numbers, spaces, hyphens, and apostrophes')
        .min(2, 'Street name must have at least 2 characters')
        .max(50, 'Street name must have less than 50 characters'),
    city: yup.string()
        .required('City is required')
        .matches(/^[a-zA-Z\s'-]+$/, 'City must only contain letters, spaces, hyphens, and apostrophes')
        .min(2, 'City must have at least 2 characters')
        .max(50, 'City must have less than 50 characters'),
    state: yup.string()
        .required('State is required')
        .matches(/^[a-zA-Z\s'-]+$/, 'State must only contain letters, spaces, hyphens, and apostrophes')
        .min(2, 'State must have at least 2 characters')
        .max(50, 'State must have less than 50 characters'),
    postCode: yup.string()
        .required('Post code is required')
        .matches(/^[0-9-]+$/, 'Post code must only contain numbers and hyphens')
        .length(4, 'Post code must be 4 digits long'),
    country: yup.string()
        .required('Country is required')
        .matches(/^[a-zA-Z\s'-]+$/, 'Country must only contain letters, spaces, hyphens, and apostrophes')
        .min(2, 'Country must have at least 2 characters')
        .max(50, 'Country must have less than 50 characters'),
})

export default function UpdateUserForm({ closeDialog }) {
    // Get access to user context
    const userData = useContext(userContext)

    // State management
    const { handleSubmit, control, formState: { errors }, getValues } = useForm({ 
        mode: "onChange", 
        resolver: yupResolver(validationSchema),
        defaultValues: {
            fname: userData.user.fname,
            lname: userData.user.lname,
            email: userData.user.email,
            phone: userData.user.phone,
            unit: userData.user.address.unit,
            streetNumber: userData.user.address.streetNumber,
            streetName: userData.user.address.streetName,
            city: userData.user.address.city,
            state: userData.user.address.state,
            postCode: userData.user.address.postCode,
            country: userData.user.address.country,
            dob: userData.user.dob,
        } 
    })
    const [isLoading, setIsLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState(null)

    // Handle form submission
    const handleUpdate = async () => {
        // No need to prevent default as that is handled by react-hook-form
        // Start spinner
        setIsLoading(true)

        // Convert form data into the expected format
        const form = buildUserForm(getValues())

        // Send fetch request to server's update user route
        try {
            // This function will only run if the user is of type "user" or "businessRep"
            // This means we can expect that userType will exist in userData without error
            // We can use this to form the url so we hit the correct API endpoint
            let userRoute
            if(userData.userType === 'user') userRoute = 'users'
            if(userData.userType === 'businessRep') userRoute = 'business-reps'
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${userRoute}/${userData.user._id}`, {
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

                // Update user context
                userData.update(form)
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
                            label="Date of Birth"
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
                
                <Typography sx={{ ...styles.formItem, width: "100%" }} variant="body1" align="left">Address:</Typography>
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
            <Toast response={responseMessage} setResponse={setResponseMessage} hideIn={6000} />
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