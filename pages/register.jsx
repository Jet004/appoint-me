import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import userDataContext from '../utility/mockData/userDataContext'
import subYears from 'date-fns/subYears'
import isWeekend from 'date-fns/isWeekend'

// Styles, UI, UX
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import BusinessProfileLayout from '../layout/businessProfileLayout'
import Button from '@mui/material/Button'
import DatePicker from '@mui/lab/DatePicker'
import InputAdornment from '@mui/material/InputAdornment'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TextField from '@mui/material/TextField'

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import CakeRoundedIcon from '@mui/icons-material/CakeRounded'
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
    password: yup.string()
        .required('Password is required')
        .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,50}$/gm, 'Password must be at least 8 characters, contain at least one number, one uppercase letter, one lowercase letter, and one special character'),
    confirmPassword: yup.string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
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
        .min(2, 'Post code must have at least 2 digits')
        .max(10, 'Post code must have 10 digits or less'),
    country: yup.string()
        .required('Country is required')
        .matches(/^[a-zA-Z\s'-]+$/, 'Country must only contain letters, spaces, hyphens, and apostrophes')
        .min(2, 'Country must have at least 2 characters')
        .max(50, 'Country must have less than 50 characters'),



})

export default function Register() {
    // Set up router to redirect users on login
    const router = useRouter()

    const userData = useContext(userDataContext)

    // State management
    const { handleSubmit, control, formState: { errors } } = useForm({ mode: "onChange", resolver: yupResolver(validationSchema) })
    const [userType, setUserType] = useState("user")
    const [form, setForm] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        phone: "",
        address: {
            unit: "",
            streetNumber: "",
            streetName: "",
            city: "",
            state: "",
            postCode: "",
            country: "",
        },
        dob: "",
    })

    // Handle form changes
    const updateForm = ((value) =>  {
        if(!value.address) {
            
            setForm(prev => ({...prev, ...value}))
        } else {
            setForm(prev => ({...prev, ...value, address: {...prev.address, ...value.address}}))
        }
    })

    // Handle form submission
    const handleRegistration = (e) => {

        // Check if passwords match

        // Check if email is already in use

        // Get user type

        console.log("form: ", form)
        // userData.createUser(form)
        // router.push('/login')
    }

    return (
        <>
            <BusinessProfileLayout logo="thumb" title=" ">
                <Box sx={styles.innerBox}>
                    <Typography sx={styles.title} variant="h3" align="center">
                        Register
                    </Typography>
                    <Box as="form" sx={styles.form} onSubmit={handleSubmit(handleRegistration)}>
                        <Tabs 
                            sx={styles.userToggle}
                            variant="fullWidth"
                            value={userType} 
                            onChange={(e, newValue) => { setUserType(newValue) }}
                        >
                            <Tab label="User" value="user" />
                            <Tab label="Business" value="business" />
                        </Tabs>
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
                                    value={form.fname}
                                    onChange={(e) => {updateForm({fname: e.target.value}); field.onChange(e.target.value)}}
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
                                    value={form.lname}
                                    onChange={(e) => {updateForm({lname: e.target.value}); field.onChange(e.target.value)}}
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
                                    value={form.email}
                                    onChange={(e) => {updateForm({email: e.target.value}); field.onChange(e.target.value)}}
                                    error={!!errors.email}
                                    helperText={errors.email && errors?.email?.message}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField 
                                    sx={styles.formItem}
                                    fullWidth
                                    name="password"
                                    InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><LockRoundedIcon /></InputAdornment>)}}
                                    type="password"
                                    placeholder="Password"
                                    {...field}
                                    value={form.password}
                                    onChange={(e) => {updateForm({password: e.target.value}); field.onChange(e.target.value)}}
                                    error={!!errors.password}
                                    helperText={errors.password ? errors?.password?.message : "Password must be at least 8 characters, contain at least one number, one uppercase letter, one lowercase letter, and one special character"}
                                />
                            )}
                        />
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <TextField 
                                    sx={styles.formItem}
                                    fullWidth
                                    name="confirmPassword"
                                    InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><LockRoundedIcon /></InputAdornment>)}}
                                    type="password"
                                    placeholder="Confirm Password"
                                    {...field}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword && errors?.confirmPassword?.message}
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
                                    value={form.phone}
                                    onChange={(e) => {updateForm({phone: e.target.value}); field.onChange(e.target.value)}}
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
                                    value={form.dob}
                                    onChange={(newDate) => {
                                        updateForm({dob: newDate})
                                        field.onChange(newDate)
                                    }}
                                    renderInput={(params) => <TextField 
                                        {...params} ß
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
                                    value={form.address.unit}
                                    onChange={(e) => {updateForm({address: { unit: e.target.value}}); field.onChange(e.target.value)}}
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
                                    value={form.address.streetNumber}
                                    onChange={(e) => {updateForm({address: { streetNumber: e.target.value}}); field.onChange(e.target.value)}}
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
                                    value={form.address.streetName}
                                    onChange={(e) => {updateForm({address: { streetName: e.target.value }}); field.onChange(e.target.value)}}
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
                                    value={form.address.city}
                                    onChange={(e) => {updateForm({ address: { city: e.target.value }}); field.onChange(e.target.value)}}
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
                                value={form.address.state}
                                onChange={(e) => {updateForm({ address: { state: e.target.value }}); field.onChange(e.target.value)}}
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
                                    value={form.address.postCode}
                                    onChange={(e) => {updateForm({ address: { postCode: e.target.value }}); field.onChange(e.target.value)}}
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
                                    value={form.address.country}
                                    onChange={(e) => {updateForm({ address: { country: e.target.value }}); field.onChange(e.target.value)}}
                                    error={!!errors.country}
                                    helperText={errors.country && errors?.country?.message}
                                />
                            )}
                        />
                        
                        <Button sx={styles.formItem}
                        fullWidth type="submit" variant="contained">Register</Button>
                    </Box>
                </Box>
            </BusinessProfileLayout>
        </>
    )
}


const styles = {
    innerBox: {
        mb: 5,
        width: "90%",
        maxWidth: 500,
    },
    title: {
        color: "custom.contrastText",
    },
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
    }
}