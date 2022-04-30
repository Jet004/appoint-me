
// Import components
import DialogTitle from '@mui/material/DialogTitle'
import ResponsiveDialog from './ResponsiveDialog'


const AppointmentDetail = ({ open, onClose }) => {
    return (
        <ResponsiveDialog open={open} onClose={onClose}>
            <DialogTitle variant="h4" align="center">
                Appointment Detail
            </DialogTitle>


            
        </ResponsiveDialog>
    )
}

export default AppointmentDetail