import React from 'react'

// Next.js imports
import Head from 'next/head'
import Image from 'next/image'

// Components
import Layout from '../layout/layout'

// Styles, UI, UX
import styles from '../styles/Home.module.css'
import { Typography } from '@mui/material'

// Images
import logoDark from '../public/images/logo_dark.png'


import * as user from '../utility/mockData/userContext'

export default function Home() {
  return (
    <>
        <Head>
            <title>AppointMe</title>
        </Head>
        <Layout page="Home">
        <Typography variant="h3">Index Page</Typography>
        <div>{}</div>
        </Layout>
        
    </>
  )
}
