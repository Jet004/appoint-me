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

export default function Login() {
    // Set up router to redirect users on login
    const router = useRouter()

    const userData = useContext(userDataContext)
    console.log(userData)

    // Form control
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const updateForm = ((value) =>  {
        setForm(prev => ({...prev, ...value}))
    })
    console.log("form: ", form)


    const handleLogin = (e) => {
        userData.login()
        e.preventDefault()
        router.push('/home')
    }

    return (
        <>
            <BusinessProfileLayout logo="thumb" title=" ">
                <Box sx={styles.innerBox}>
                    <Typography sx={styles.title} variant="h3" align="center">
                        Login
                    </Typography>
                    <Box as="form" sx={styles.form} onSubmit={handleLogin}>
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
                        <Button sx={styles.formItem} type="submit" variant="contained">Login</Button>
                    </Box>
                </Box>
            </BusinessProfileLayout>
        </>
    )
}


const styles = {
    innerBox: {
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