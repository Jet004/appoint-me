import React from 'react'

import Dialog from '@mui/material/Dialog'
import CircularProgress from '@mui/material/CircularProgress'

const Spinner = ({ open }) => {
  return (
    <Dialog open={open} sx={ styles.dialogStyle } PaperProps={{ sx: {background: "transparent" }, elevation: 0 }}>
        <CircularProgress sx={styles.spinStyle} size="5rem" />
    </Dialog>
  )
}

export default Spinner


const styles = {
    dialogStyle: {
        backgroundImage: (theme) => theme.palette.custom.gradient.medium
    },
    spinStyle: {
        m: 6,
    }
}