import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const Toast = ({ response, setResponse, hideIn}) => {
  return (
    <>
        {response && (
            <Snackbar sx={styles.position} open={!!response} autoHideDuration={hideIn} onClose={() => setResponse(null)}>
                <Alert severity={response.severity}>
                    {response.message}
                </Alert>
            </Snackbar>
        )}
    </>
  )
}

export default Toast

const styles = {
    position: {
        bottom: {xs: 60, sm: 8}
    }
}