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
        <Layout page="Calendar">
        <Typography variant="h3">Calendar Page</Typography>
        <div>{}</div>
        </Layout>
        
    </>
  )
}

export default Calendar