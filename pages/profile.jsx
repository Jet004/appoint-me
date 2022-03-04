import React from 'react'
import Head from 'next/head'

// Style, UI and UX
import Typography from '@mui/material/Typography'

// Components
import Layout from '../layout/layout'

const Profile = () => {
  return (
    <>
        <Head>
            <title>AppointMe: Profile</title>
        </Head>
        <Layout page="Profile">
        <Typography variant="h3">Profile Page</Typography>
        <div>{}</div>
        </Layout>
        
    </>
  )
}

export default Profile