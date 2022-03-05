import React from 'react'

// Next.js imports
import Head from 'next/head'

// Components
import Layout from '../layout/layout'

// Styles, UI, UX
import { Typography } from '@mui/material'

// Images


export default function Services() {
  return (
    <>
        <Head>
            <title>AppointMe: Services</title>
        </Head>
        <Layout page="Services">
        <Typography variant="h3">Services Page</Typography>
        <div>{}</div>
        </Layout>
        
    </>
  )
}
