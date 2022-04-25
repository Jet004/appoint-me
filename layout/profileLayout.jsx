import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { buildAddress } from '../utility/helperFunctions'
import UpdateUserForm from '../forms/UpdateUserForm'
import UpdateTempUserForm from '../forms/UpdateTempUserForm'
import UploadDpForm from '../forms/UploadDpForm'

// Components
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CustomImage from '../components/custom-image'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FeatureBox from '../components/featureBox'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import AccountCircle from '@mui/icons-material/AccountCircle'
import ImageSearchRoundedIcon from '@mui/icons-material/ImageSearchRounded'
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded'
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import CloseIcon from '@mui/icons-material/Close'
import { FiEdit } from 'react-icons/fi'

// date-fns
import format from 'date-fns/format'
import isPast from 'date-fns/isPast'

import userContext from '../utility/mockData/appContext'


const ProfileLayout = ({ userData, businessId, refreshClientList, setResponseMessage, closeDialog }) => {
    // Access the router object
    const router = useRouter()
    // Access user context
    const loggedInUser = useContext(userContext)

    // Determine if this is a temp user or not
    const isTempUser = !!userData.tempFlag
    const canDeleteUser = (!!userData.tempFlag || userData.user._id === loggedInUser.user._id)

    // Handle sub-menu for account history links
    const [userFormDialog, setUserFormDialog] = useState(false) // Dialog for user update form
    const [uploadDpDialog, setUploadDpDialog] = useState(false) // Dialog for uploading a new profile picture
    const [deleteDialog, setDeleteDialog] = useState(false) // Dialog to confirm delete
    const [avatar, setAvatar] = useState(null) // Profile picture

    // Get user profile picture on first client side render
    useEffect(() => {
      const getDp = async () => {
        try {
            // Send fetch request to get user profile picture
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile-picture/${userData.user._id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            })
            
            // Throw and error if response failed
            if(!response.ok) {
                const data = await response.json()
                throw new Error(`[${response.status}] ${data.message}`)
            }

            // Request was successful, get image blob
            const blob = await response.blob()
            // Convert the blob to base64
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                const base64Image = reader.result
                // Force the image to update
                setAvatar(base64Image)            
            }
        } catch (error) {
            console.log(error)
        }
      }
      
      // Wait until user data loaded before getting profile picture
      // Only get the profile picture if the user is not a temp user
      if(userData.user._id && !isTempUser) getDp()
    
    }, [userData, avatar])
    

    // Function to handle account deletion
    const handleDelete = async () => {
        // Check if logged in user is allowed to delete this user
        if(!canDeleteUser) {
            setResponseMessage({
                message: 'You are not allowed to delete this user',
                severity: 'error'
            })

            // Return to prevent deletion
            return
        }

        // Make sure required data is available
        if(!userData.user._id || (isTempUser && !businessId)) {
            setResponseMessage({
                message: 'Unable to delete user. Please try again',
                severity: 'error'
            })

            // Return to prevent deletion
            return
        }

        // Determine which API endpoint is needed
        let endpoint
        if(isTempUser){
            endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/temp-users/${businessId}/${userData.user._id}`
        } else if(userData.userType === 'user'){
            endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userData.user._id}`
        } else if(userData.userType === 'businessRep') {
            endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/business-reps/${userData.user._id}`
        } else {
            // Not a valid user type, return to prevent deletion
            setResponseMessage({
                message: 'Invalid user type. Please try again',
                severity: 'error'
            })
            return
        }

        // Passed all checks, send delete request
        try {
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            })
            // The response doesn't have a body as it should return a 204. We can just check the status code
            
            // Throw an error if response failed
            if(!response.ok) {
                throw new Error(`[${response.status}] An unexpected error occurred. Could not delete user`)
            }

            
            // Request was successful, close dialog and refresh client list if is a business client
            if(isTempUser) closeDialog()
            if(refreshClientList) refreshClientList()

            // Inform the user
            setResponseMessage({
                message: 'User deleted successfully',
                severity: 'success'
            })
            
            // Force logout if deleted own account
            if(userData.user._id === loggedInUser.user._id) {
                // Set the user to null to force logout
                loggedInUser.logout()
                
                // Redirect to login page
                router.push('/login')
            }


        } catch (error) {
            console.log(error)

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
                <Box sx={styles.profileBox}>

                    {/* Don't show the edit profile picture button for temp users */}
                    {!isTempUser && (
                        <Badge
                        sx={styles.badge}
                            overlap="circular"
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            badgeContent={
                                <IconButton sx={styles.badgeIcon} onClick={() => {setUploadDpDialog(true); console.log("CLICKED!")}}>
                                    <ImageSearchRoundedIcon />
                                </IconButton>
                            }
                        >
                            <CustomImage style={styles.profilePic} alt="Profile picture" src={avatar} fallBack={<AccountCircle />} width={90} height={90} noBlur="true" />
                        </Badge>
                    )}

                    {/* Allow image placeholder to be rendered for temp users */}
                    {isTempUser && (
                        <CustomImage style={styles.profilePic} alt="Profile picture" src={avatar} fallBack={<AccountCircle />} width={90} height={90} noBlur="true" />
                    )}

                    <Typography variant="h4">
                        {`${userData.user.fname} ${userData.user.lname}`}
                    </Typography>
                </Box>

                <FeatureBox
                    sx={styles.profileDetailsBox}
                    title="Personal Details" 
                    iconLeft={<AssignmentIndRoundedIcon />}
                    // Edit icon is hidden if businessRep viewing user profile - can only edit temp accounts
                    { ...canDeleteUser && ({
                        iconRight: <FiEdit fontSize="20px" />,
                        clickRightIcon: () => setUserFormDialog(true)
                    }) }
                    
                >
                    <Box sx={styles.profileBoxBody} >
                        <List>
                            {/* Address is optional for temp users. Only display it if the data exists */}
                            {(!isTempUser || (isTempUser && userData.user.address)) && (
                                <ListItem key="address">
                                    <LocationOnRoundedIcon />
                                    <ListItemText sx={styles.listItemText}>{buildAddress(userData.user.address)}</ListItemText>
                                </ListItem>
                            )}
                            <ListItem key="phone">
                                <LocalPhoneRoundedIcon />  
                                <ListItemText sx={styles.listItemText}>{userData.user.phone}</ListItemText>
                            </ListItem>
                            <ListItem key="email">
                                <AlternateEmailRoundedIcon />
                                <ListItemText sx={styles.listItemText}>{userData.user.email}</ListItemText>
                            </ListItem>
                        </List>
                    </Box>
                </FeatureBox>
                <FeatureBox
                    sx={styles.accountHistoryBox}
                    title="Account History" 
                    iconLeft={<HistoryRoundedIcon />}
                >
                    <Accordion sx={styles.historyAccordion} disableGutters>
                        <AccordionSummary 
                            sx={styles.historyItem} 
                            key="appointment-history"
                            expandIcon={<ChevronRightRoundedIcon />}
                        >
                            <Typography variant="body1">View Appointment History</Typography>
                            
                        </AccordionSummary>  
                        <AccordionDetails>
                            {!userData?.user?.appointments?.length && (<List>You haven&apos;t attended any appointments yet...</List>)}
                            <List>
                                {!!userData.user.appointments && userData.user.appointments.sort((a, b) => b.datetime - a.datetime).map(appointment => {
                                    if(isPast(appointment.datetime)) {
                                        return (
                                            <ListItem key={format(appointment.datetime, "dd-MMM-yyy")}>
                                                {format(appointment.datetime, "dd MMM yyyy")}
                                            </ListItem>
                                        )
                                    } else return
                                })}
                            </List>
                        </AccordionDetails>  
                    </Accordion>
                    <Accordion sx={styles.historyAccordion} disableGutters>
                        <AccordionSummary 
                            sx={styles.historyItem}  
                            key="payment-history"
                            expandIcon={<ChevronRightRoundedIcon />}
                        >
                            <Typography variant="body1">View Payment History</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            Content
                        </AccordionDetails>
                    </Accordion>
                </FeatureBox>
                {canDeleteUser && (
                    <Button 
                        sx={styles.deleteButton} 
                        color="error" 
                        variant="outlined"
                        onClick={() => setDeleteDialog(true)}
                    >
                        Delete Account
                    </Button>
                )}

                <Dialog sx={styles.formDialog} open={userFormDialog} onClose={() => setUserFormDialog(false)}>
                    <DialogTitle variant="h4" align="center">
                        Edit Profile
                        <IconButton
                            aria-label="close"
                            onClick={() => setUserFormDialog(false)}
                            sx={styles.closeButton}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        {/* Display the correct form for temp users vs other user types */}
                        {!isTempUser && ( <UpdateUserForm closeDialog={() => setUserFormDialog(false)} /> )}
                        {isTempUser && ( 
                            <UpdateTempUserForm 
                                closeDialog={() => setUserFormDialog(false)}
                                userData={userData}
                                businessId={businessId}
                                refreshClientList={refreshClientList}
                                setResponseMessage={setResponseMessage}
                            /> 
                        )}
                    </DialogContent>
                </Dialog>
                {/* Only allow dialog to be displayed for non temp users */}
                {!isTempUser && (
                    <Dialog sx={styles.formDialog} open={uploadDpDialog} onClose={() => {setUploadDpDialog(false)}}>
                        <DialogTitle variant="h4" align="center">
                            Edit Profile Picture
                            <IconButton
                                aria-label="close"
                                onClick={() => setUploadDpDialog(false)}
                                sx={styles.closeButton}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <UploadDpForm reload={setAvatar} closeDialog={() => setUploadDpDialog(false)} />
                        </DialogContent>
                    </Dialog>
                )}
                {/* Confirm delete dialog */}
                {/* This will not be available if logged in user is a businessRep and profile is for user. A
                businessRep can only delete a temp user account. */}
                {canDeleteUser && (
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
                            <Typography variant="body1">Please confirm that you would like to delete this account.</Typography>
                            <Typography variant="caption"  color="error">Warning: This action is permanent. Any data deleted will be unrecoverable.</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="error" onClick={() => {handleDelete(); setDeleteDialog(false) }}>Delete</Button>
                            <Button variant="outlined" onClick={() => setDeleteDialog(false)}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Box>            
        </>
    )  
}

export default ProfileLayout


const styles = {
    cont: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    profileBox: {
        width: {xs: "100%", sm: "80%", lg: "60%"},
        display: "flex",
        justifyContent: {xs: "center", sm: "flex-start"},
        alignItems: "center",
        mt: 3,
    },
    profileBoxBody: {
        color: (theme) => theme.palette.mode === 'dark' ? "custom.contrastText" : 'text.custom.highlight',
        width: "100%",
        px: {xs: 3},
        pb: 2
    },
    badge: {
        mx: 3,
    },
    badgeIcon: {
        backgroundImage: (theme) => theme.palette.custom.gradient.iconBackground,
    },
    profilePic: {
        width: 90,
        height: 90,
        color: "custom.contrastText"
    },
    profileName: {

    },
    profileDetailsBox: {
        mt: 5,
    },
    listItemText: {
        ml: 2,
    },
    accountHistoryBox: {
        mb: 10,
        pb: 2,
    },
    historyAccordion: {
        color: (theme) => theme.palette.mode == 'dark' ? "custom.contrastText" : "custom.highlight",
        textDecoration: "none",
        backgroundColor: "custom.secondary.main",
        '&:hover': {
            backgroundImage: (theme) => theme.palette.custom.gradient.light,
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
        },
        '&:hover .MuiSvgIcon-root': {
            color: "common.white",
        },
        '&.Mui-expanded': {
            backgroundImage: (theme) => theme.palette.custom.gradient.medium,
            borderColor: "common.white",
            color: "common.white",
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
        },
        '.MuiSvgIcon-root': {
            color: (theme) => theme.palette.mode == 'dark' ? "custom.contrastText" : "custom.highlight",
        },
        '.Mui-expanded .MuiSvgIcon-root': {
            color: "common.white",
        }
    },
    historyItem: {
        backgroundImage: (theme) => theme.palette.custom.gradient.light,
        borderBottom: "1px solid",
        borderColor: "custom.contrastText",
        py: 2,
        '&:hover': {
            backgroundImage: (theme) => theme.palette.custom.gradient.medium,
            borderColor: "common.white",
            color: "common.white",
        },
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
          },
        '& .MuiAccordionSummary-content': {
            ml: 4,
        },
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
        px: 3
    }

}