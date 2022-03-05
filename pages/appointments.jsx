import React from 'react'

// Next.js imports
import Head from 'next/head'

// Components
import Layout from '../layout/layout'

// Styles, UI, UX
import { Typography } from '@mui/material'

// Images


export default function Appointments() {
  return (
    <>
        <Head>
            <title>AppointMe: Appointments</title>
        </Head>
        <Layout page="Appointments">
        <Typography variant="h3">Appointments Page</Typography>
        <div>{}</div>
        </Layout>
        
    </>
  )
}
