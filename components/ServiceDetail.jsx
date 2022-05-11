import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import userContext from '../utility/appContext'
import localForage from 'localforage'

// Import form components
import UpdateServiceForm from '../forms/UpdateServiceForm'

// Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FeatureBox from '../components/featureBox'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ResponsiveDialog from '../components/ResponsiveDialog'
import Typography from '@mui/material/Typography'

// Import icons
import CloseIcon from '@mui/icons-material/Close'
import { FiEdit } from 'react-icons/fi'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import FreeBreakfastRoundedIcon from '@mui/icons-material/FreeBreakfastRounded'
import SellRoundedIcon from '@mui/icons-material/SellRounded'


const ServiceDetail = ({ serviceData, businessId, refreshServiceList, setIsLoading, setResponseMessage, closeDialog }) => {
    // Access the router object
    const router = useRouter()
    // Access user context
    const loggedInUser = useContext(userContext)

    // Handle sub-menu for account history links
    const [updateServiceDialog, setUpdateServiceDialog] = useState(false) // Dialog for service update form
    const [deleteDialog, setDeleteDialog] = useState(false) // Dialog to confirm delete

    // Function to handle account deletion
    const handleDelete = async () => {
        // Make sure required data is available
        if(!serviceData._id || !businessId) {
            setResponseMessage({
                message: 'Unable to delete user. Please try again',
                severity: 'error'
            })
            // Return to prevent deletion
            return
        }

        // Start Spinner
        setIsLoading(true)

        // Passed all checks, send delete request
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/businesses/services/${businessId}/${serviceData._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await localForage.getItem('accessToken')}`
                }
            })
            // The response doesn't have a body as it should return a 204. We can just check the status code
            
            // Throw an error if response failed - response will have a body if it failed
            if(!response.status === 204) {
                const data = await response.json()
                throw {
                    status: data.status,
                    message: data.message
                }
            }

            // Stop spinner
            setIsLoading(false)

            // Request was successful, close dialog and refresh service list
            closeDialog()
            refreshServiceList()

            // Inform the user
            setResponseMessage({
                message: 'Service deleted',
                severity: 'success'
            })

        } catch (error) {
            console.log(error)

            // Stop spinner
            setIsLoading(false)

            // Inform the user of the error
            setResponseMessage({
                message: error.message,
                severity: 'error'
            })
        }
    }


    return (
        <>
            <Box sx={styles.cont}>
                <Box sx={styles.serviceBox}>
                    <Typography variant="h4">
                        { serviceData.name }
                    </Typography>
                </Box>

                <FeatureBox
                    sx={styles.serviceDetailsBox}
                    title="Service Details" 
                    iconLeft={<WorkRoundedIcon />}
                    iconRight={<FiEdit fontSize="20px" />}
                    clickRightIcon={() => setUpdateServiceDialog(true)}
                >
                    <Box sx={styles.serviceBoxBody} >
                        <List>
                            <ListItem sx={styles.description} key="name">
                                <Box sx={styles.description.label}>
                                    <WorkRoundedIcon />  
                                    <ListItemText sx={styles.listItemText}>Service Name:</ListItemText>
                                </Box>
                                <ListItemText sx={{ ...styles.listItemText, ...styles.description.text }}>{serviceData.name}</ListItemText>
                            </ListItem>
                            <ListItem sx={styles.description} key="description">
                                <Box sx={styles.description.label}>
                                    <DescriptionRoundedIcon />  
                                    <ListItemText sx={styles.listItemText}>Description:</ListItemText>
                                </Box>
                                <ListItemText sx={{ ...styles.listItemText, ...styles.description.text }}>{serviceData.description}</ListItemText>
                            </ListItem>
                            <ListItem key="duration">
                                <AccessTimeRoundedIcon />
                                <ListItemText sx={styles.listItemText}> Duration: {serviceData.duration} minutes</ListItemText>
                            </ListItem>
                            <ListItem key="break">
                                <FreeBreakfastRoundedIcon />
                                <ListItemText sx={styles.listItemText}>Break: {serviceData.break} minutes</ListItemText>
                            </ListItem>
                            <ListItem key="fee">
                                <SellRoundedIcon />
                                <ListItemText sx={styles.listItemText}>Fee: ${serviceData.fee}</ListItemText>
                            </ListItem>
                        </List>
                    </Box>
                </FeatureBox>

                <Button 
                    sx={styles.deleteButton} 
                    color="error" 
                    variant="outlined"
                    onClick={() => setDeleteDialog(true)}
                >
                    Delete Service
                </Button>

                <ResponsiveDialog sx={styles.formDialog} open={updateServiceDialog} onClose={() => setUpdateServiceDialog(false)}>
                    <DialogTitle variant="h4" align="center">
                        Edit Service
                    </DialogTitle>
                    <DialogContent>
                        <UpdateServiceForm
                            serviceData={serviceData}
                            businessId={businessId}
                            refreshServiceList={refreshServiceList}
                            setResponseMessage={setResponseMessage}
                            closeDialog={() => setUpdateServiceDialog(false)}
                        /> 
                    </DialogContent>
                </ResponsiveDialog>

                {/* Confirm delete dialog */}
                <Dialog fullWidth open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                    <DialogTitle variant="h4" align="center">
                        Confirm Delete
                        <IconButton
                            aria-label="close"
                            onClick={() => setDeleteDialog(false)}
                            sx={styles.closeButton}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">Please confirm that you would like to delete this service.</Typography>
                        <Typography variant="caption"  color="error">Warning: This action is permanent. Any data deleted will be unrecoverable.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="error" onClick={() => {handleDelete(); setDeleteDialog(false) }}>Delete</Button>
                        <Button variant="outlined" onClick={() => setDeleteDialog(false)}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Box>            
        </>
    )  
}

export default ServiceDetail


const styles = {
    cont: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    serviceBox: {
        width: {xs: "100%", sm: "80%", lg: "60%"},
        minWidth: 340,
        maxWidth: 600,
        display: "flex",
        justifyContent: {xs: "center", sm: "flex-start"},
        alignItems: "center",
        mt: 3,
        mb: 2,
    },
    serviceBoxBody: {
        color: (theme) => theme.palette.mode === 'dark' ? "custom.contrastText" : 'text.custom.highlight',
        width: "100%",
        px: {xs: 3},
        pb: 2
    },
    serviceDetailsBox: {
        mt: 2,
    },
    description: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        label: {
            display: "flex",
            alignItems: "center",
        },
        text: {
            pl: 3,
        },
    },
    listItemText: {
        ml: 2,
    },
    formDialog: {
        color: "custom.constrastText"
    },
    closeButton: {
        position: 'absolute',
        right: 8,
        top: 8,
        color: "custom.constrastText",
    },
    deleteButton: {
        py: 2,
        px: 3,
        my: 5,
    }

}