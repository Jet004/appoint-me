import { useState, useContext } from 'react'
import userDataContext from '../utility/mockData/userDataContext'

// Next.js imports
import { useRouter } from 'next/router'

// Styles, UI, UX
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import BusinessProfileLayout from '../layout/businessProfileLayout'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

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


export default function Register() {
    // Set up router to redirect users on login
    const router = useRouter()

    const userData = useContext(userDataContext)
    console.log(userData)

    // Form control
    const [form, setForm] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        appointments: [],
    })

    const updateForm = ((value) =>  {
        console.log("value: ", value)
        if(!value.address) {
            setForm(prev => ({...prev, ...value}))
        } else {
            setForm(prev => ({...prev, ...value, address: {...prev.address, ...value.address}}))
        }
    })
    console.log("form: ", form)


    const handleRegistration = (e) => {
        e.preventDefault()

        // Check if passwords match

        // Check if email is already in use

        // 

        userData.createUser(form)
        router.push('/login')
    }

    return (
        <>
            <BusinessProfileLayout logo="thumb" title=" ">
                <Box sx={styles.innerBox}>
                    <Typography sx={styles.title} variant="h3" align="center">
                        Register
                    </Typography>
                    <Box as="form" sx={styles.form} onSubmit={handleRegistration}>
                        <TextField
                            sx={styles.formItem}
                            fullWidth
                            name="fname" 
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><AccountCircleIcon /></InputAdornment>)}}
                            type="text"
                            placeholder="First Name"
                            required
                            value={form.fname}
                            onChange={(e) => updateForm({fname: e.target.value})} 
                        />
                        <TextField
                            sx={styles.formItem}
                            fullWidth
                            name="lname" 
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><AccountCircleIcon /></InputAdornment>)}}
                            type="text"
                            placeholder="Last Name"
                            required
                            value={form.lname}
                            onChange={(e) => updateForm({lname: e.target.value})} 
                        />
                        <TextField
                            sx={styles.formItem}
                            fullWidth
                            name="email"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><AlternateEmailRoundedIcon /></InputAdornment>)}}
                            type="email"
                            placeholder="Email"
                            required
                            value={form.email}
                            onChange={(e) => updateForm({email: e.target.value})} 
                        />
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="password"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><LockRoundedIcon /></InputAdornment>)}}
                            type="password"
                            placeholder="Password"
                            required
                            value={form.password}
                            onChange={(e) => updateForm({password: e.target.value})}
                        />
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="confirmPassword"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><LockRoundedIcon /></InputAdornment>)}}
                            type="password"
                            placeholder="Confirm Password"
                            required
                            value={form.confirmPassword}
                            onChange={(e) => updateForm({confirmPassword: e.target.value})}
                        />
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="phone"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><LocalPhoneRoundedIcon /></InputAdornment>)}}
                            inputProps={{pattern: "[0-9]{8,10}"}}
                            type="text"
                            placeholder="Phone"
                            required
                            value={form.phone}
                            onChange={(e) => updateForm({phone: e.target.value})}
                        />
                        <TextField 
                            sx={{ ...styles.formItem, mb: 1 }}
                            fullWidth
                            name="dob"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><CakeRoundedIcon /></InputAdornment>)}}
                            inputProps={{pattern: "[0-9]{8,10}"}}
                            type="text"
                            placeholder="Date of Birth"
                            required
                            value={form.dob}
                            onChange={(e) => updateForm({dob: e.target.value})}
                        />
                        <Typography sx={{ ...styles.formItem, width: "100%" }} variant="body1" align="left">Address:</Typography>
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="unit"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><ApartmentRoundedIcon /></InputAdornment>)}}
                            inputProps={{pattern: "[0-9]{0,6}"}}
                            type="text"
                            placeholder="Unit"
                            value={form.address.unit}
                            onChange={(e) => updateForm({address: { unit: e.target.value}})}
                        />
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="streetNumber"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><HomeRoundedIcon /></InputAdornment>)}}
                            inputProps={{pattern: "[0-9]{0,10}"}}
                            type="text"
                            placeholder="Street Number"
                            required
                            value={form.address.streetNumber}
                            onChange={(e) => updateForm({address: { streetNumber: e.target.value}})}
                        />
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="streetName"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><SignpostRoundedIcon /></InputAdornment>)}}
                            inputProps={{pattern: "[A-Za-z]{1,30}"}}
                            type="text"
                            placeholder="Street Name"
                            required
                            value={form.address.streetName}
                            onChange={(e) => updateForm({address: { streetName: e.target.value }})}
                        />
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="city"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><LocationOnRoundedIcon /></InputAdornment>)}}
                            inputProps={{pattern: "[A-Za-z]{1,50}"}}
                            type="text"
                            placeholder="City"
                            required
                            value={form.address.city}
                            onChange={(e) => updateForm({ address: { city: e.target.value }})}
                        />
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="state"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><LocationOnRoundedIcon /></InputAdornment>)}}
                            inputProps={{pattern: "[A-Za-z]{1,10}"}}
                            type="text"
                            placeholder="State/Province"
                            required
                            value={form.address.state}
                            onChange={(e) => updateForm({ address: { state: e.target.value }})}
                        />
                        <TextField 
                            sx={styles.formItem}
                            fullWidth
                            name="postCode"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><LocationOnRoundedIcon /></InputAdornment>)}}
                            inputProps={{pattern: "[0-9]{4,8}"}}
                            type="text"
                            placeholder="Postcode"
                            required
                            value={form.address.postCode}
                            onChange={(e) => updateForm({ address: { postCode: e.target.value }})}
                        />
                        <TextField 
                            sx={{...styles.formItem, width: "100%", mb: 1 }}
                            name="country"
                            InputProps={{startAdornment: (<InputAdornment sx={styles.inputIcon} position="start"><PublicRoundedIcon /></InputAdornment>)}}
                            inputProps={{pattern: "[A-Za-z]{1,40}"}}
                            type="text"
                            placeholder="Country"
                            required
                            value={form.address.country}
                            onChange={(e) => updateForm({ address: { country: e.target.value }})}
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
    formItem: {
        mt: 1,
    },
    inputIcon: {
        color: "custom.contrastText",
    }
}