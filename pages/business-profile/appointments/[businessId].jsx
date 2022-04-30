import Head from 'next/head'

// Components
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Layout from '../../../layout/layout'
import NewAppointmentForm from '../../../forms/NewAppointmentForm'


export default function Appointments() {
  return (
    <>
        <Head>
            <title>AppointMe: Appointments</title>
        </Head>
        <Layout page="Appointments">
            <Container sx={styles.cont}>
                <Box sx={styles.outerBox}>
                    <NewAppointmentForm />
                </Box>
            </Container>
        </Layout>
        
    </>
  )
}

const styles = {
    cont: (theme) => ({
        mt: 2,
        minWidth: "360px",
        width: {xs: "100%", md: "90%"},
        [theme.breakpoints.down("sm")]: {
            px: 1,
        }
    }),
    outerBox: {
        width: "100%",
        display: "flex",
        justifyContent: "Center",
    }
}