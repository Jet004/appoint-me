import React from 'react'

// Next.js imports
import Head from 'next/head'

// Components
import Layout from '../layout/layout'

// Styles, UI, UX
import { Typography } from '@mui/material'

// Images


export default function Home() {
  return (
    <>
        <Head>
            <title>AppointMe: Home</title>
        </Head>
        <Layout page="Home">
        <Typography variant="h3">Home Page</Typography>
        <div>{}</div>
        </Layout>
        
    </>
  )
}
