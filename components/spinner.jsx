import React from 'react'

import Dialog from '@mui/material/Dialog'
import CircularProgress from '@mui/material/CircularProgress'

const Spinner = ({ open, dialogStyle, spinStyle }) => {
  return (
    <Dialog open={open} sx={ dialogStyle } PaperProps={{ sx: {background: "transparent" }, elevation: 0 }}>
        <CircularProgress sx={spinStyle} size="5rem" />
    </Dialog>
  )
}

export default Spinner
