import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Import icons
import CloseIcon from '@mui/icons-material/Close'

const FloatingDialog = ({ open, onClose, type, title, primaryButton, onConfirm, children }) => {

    // Define variables
    let titleText
    let primaryButtonText

    if(type === 'delete'){
        titleText = "Confirm Delete"
        primaryButtonText="Delete"
    }

    if(title) titleText = title
    if(primaryButton) primaryButtonText = primaryButton


    return (
        <Dialog fullWidth open={open} onClose={onClose}>
            <DialogTitle variant="h4" align="center">
                {titleText}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={styles.closeButton}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
               { children }
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="error" onClick={() => {onConfirm(); onClose() }}>{primaryButtonText}</Button>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FloatingDialog

const styles = {
    closeButton: {
        position: 'absolute',
        right: 8,
        top: 8,
        color: "custom.constrastText",
    }
}