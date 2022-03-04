import React from 'react'
import Head from 'next/head'

// Styles, UI and UX imports
import Typography from '@mui/material/Typography'

import Layout from '../layout/layout'


const Clients = () => {
  return (
    <>
        <Head>
            <title>AppointMe: Client List</title>
        </Head>
        <Layout page="Clients">
        <Typography variant="h3">Client List Page</Typography>
        <div>{}</div>
        </Layout>
    </>
  )
}

export default Clients