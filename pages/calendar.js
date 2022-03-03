import React from 'react'
import Head from 'next/head'

// Style, UI and UX imports
import Typography from '@mui/material/Typography'

// Component imports
import Layout from '../layout/layout'

const Calendar = () => {
  return (
    <>
        <Head>
            <title>AppointMe: Calendar</title>
        </Head>
        <Layout page="Home">
        <Typography variant="h3">Index Page</Typography>
        <div>{}</div>
        </Layout>
        
    </>
  )
}

export default Calendar