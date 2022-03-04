import React from 'react'
import Head from 'next/head'

// Style, UI and UX imports
import Typography from '@mui/material/Typography'

// Component imports
import Layout from '../layout/layout'

const BusinessProfile = () => {
  return (
    <>
        <Head>
            <title>AppointMe: Business Profile</title>
        </Head>
        <Layout page="Services">
        <Typography variant="h3">Business Profile Page</Typography>
        <div>{}</div>
        </Layout>
        
    </>
  )
}

export default BusinessProfile