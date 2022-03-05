import { useState, useContext } from 'react'
import userDataContext from '../utility/mockData/userDataContext'

// Next.js imports
import { useRouter } from 'next/router'

// Styles, UI, UX
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import BusinessProfileLayout from '../layout/businessProfileLayout'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

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
    })

    const updateForm = ((value) =>  {
        setForm(prev => ({...prev, ...value}))
    })
    console.log("form: ", form)


    const handleRegistration = (e) => {
        userData.createUser(form)
        e.preventDefault()
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
                            name="fname" 
                            inputProps={{type: "text"}}
                            placeholder="First Name"
                            onChange={(e) => updateForm({email: e.target.value})} 
                        />
                        <TextField
                            sx={styles.formItem}
                            name="lname" 
                            inputProps={{type: "text"}}
                            placeholder="Last Name"
                            onChange={(e) => updateForm({email: e.target.value})} 
                        />
                        <TextField
                            sx={styles.formItem}
                            name="email" 
                            inputProps={{type: "text"}}
                            placeholder="Email"
                            onChange={(e) => updateForm({email: e.target.value})} 
                        />
                        <TextField 
                            sx={styles.formItem}
                            name="password"
                            inputProps={{type: "password"}}
                            placeholder="Password"
                            onChange={(e) => updateForm({password: e.target.value})}
                        />
                        <TextField 
                            sx={styles.formItem}
                            name="confirmPassword"
                            inputProps={{type: "password"}}
                            placeholder="Confirm Password"
                            onChange={(e) => updateForm({password: e.target.value})}
                        />
                        <Button sx={styles.formItem} type="submit" variant="contained">Register</Button>
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
        flexDirection: "column",
    },
    formItem: {
        mt: 1,
    }
}