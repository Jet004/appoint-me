
// Import components
import Box from '@mui/material/Box'
import BusinessProfileLayout from '../layout/businessProfileLayout'
import Typography from '@mui/material/Typography'

const Offline = () => {
  return (
    <BusinessProfileLayout logo="full" title="Offline" page="Offline">
        <Box sx={styles.container}>
            <Typography variant="h3" align="center">Offline</Typography>
            <Typography variant="body1">You are currently offline. This function will be availiable when your internet connection is restored.</Typography>
        </Box>
    </BusinessProfileLayout>
  )
}

export default Offline

const styles = {
    container: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            my: 1,
        },
    },
}