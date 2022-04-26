import Dialog from "@mui/material/Dialog"
import IconButton from "@mui/material/IconButton"

// Import icons
import CloseIcon from "@mui/icons-material/Close"

// Import theme
import { useTheme } from "@mui/material/styles"
import useMediaQuery from '@mui/material/useMediaQuery'

const ResponsiveDialog = ({ children, open, onClose, onCloseButtonClick, ...rest}) => {

    // Get access to the theme variables and set breakpoint for fullscreen modals
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    
    return (
        <Dialog
            PaperProps={{sx: styles.clientDialog}} 
            fullScreen={fullScreen} 
            fullWidth={!fullScreen} 
            scroll="paper"
            open={open}
            onClose={onClose}
            {...rest}
        >
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={styles.closeButton}
            >
                <CloseIcon />
            </IconButton>

            { open && children }

        </Dialog>
    )
}

export default ResponsiveDialog

const styles = {
    clientDialog: {
        backgroundImage: "none",
    },
    closeButton: {
        position: 'absolute',
        right: 8,
        top: 8,
        color: "custom.constrastText",
    },
}