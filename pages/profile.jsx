import { useState, useContext } from 'react'
import Head from 'next/head'

// Import Components
import Layout from '../layout/layout'
import ProfileLayout from '../layout/profileLayout'
import Toast from '../components/toast'


// User data
import userContext from '../utility/mockData/appContext'

const Profile = () => {
    // Access user context
    const userData = useContext(userContext)

    const [responseMessage, setResponseMessage] = useState(null)

    return (
        <>
            <Head>
                <title>AppointMe: Profile</title>
            </Head>
            <Layout page="Profile">
                <ProfileLayout userData={userData} setResponseMessage={setResponseMessage} />
                <Toast response={responseMessage} setResponse={setResponseMessage} hideIn={6000} />
            </Layout>
        </>
    )
}

export default Profile


// import { useContext, useState, useEffect } from 'react'
// import Head from 'next/head'
// import { buildAddress } from '../utility/helperFunctions'
// import UpdateUserForm from '../forms/UpdateUserForm'
// import UploadDpForm from '../forms/UploadDpForm'

// // Style, UI and UX
// import Accordion from '@mui/material/Accordion'
// import AccordionSummary from '@mui/material/AccordionSummary'
// import AccordionDetails from '@mui/material/AccordionDetails'
// import Badge from '@mui/material/Badge'
// import Box from '@mui/material/Box'
// import CustomImage from '../components/custom-image'
// import Dialog from '@mui/material/Dialog'
// import DialogContent from '@mui/material/DialogContent'
// import DialogTitle from '@mui/material/DialogTitle'
// import IconButton from '@mui/material/IconButton'
// import Link from '../components/link'
// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem'
// import ListItemText from '@mui/material/ListItemText'
// import Typography from '@mui/material/Typography'

// import AccountCircle from '@mui/icons-material/AccountCircle'
// import ImageSearchRoundedIcon from '@mui/icons-material/ImageSearchRounded'
// import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded'
// import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
// import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
// import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'
// import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded'
// import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
// import CloseIcon from '@mui/icons-material/Close'
// import { FiEdit } from 'react-icons/fi'


// // Components
// import Layout from '../layout/layout'
// import FeatureBox from '../components/featureBox'

// // date-fns
// import format from 'date-fns/format'
// import isPast from 'date-fns/isPast'

// // User data
// import userContext from '../utility/mockData/appContext'

// const Profile = () => {
//     // Access user context
//     const userData = useContext(userContext)
//     // Handle sub-menu for account history links
//     const [appointmentHistoryEl, setAppointmentHistoryEl] = useState(null)
//     const [paymentHistoryEl, setPaymentHistoryEl] = useState(null)
//     const [userFormDialog, setUserFormDialog] = useState(false)
//     const [uploadDpDialog, setUploadDpDialog] = useState(false)
//     const [avatar, setAvatar] = useState(null)

//     // Get user profile picture on first client side render
//     useEffect(() => {
//       const getDp = async () => {
//         try {
//             // Send fetch request to get user profile picture
//             const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile-picture/${userData.user._id}`, {
//                 headers: {
//                     'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
//                 }
//             })
            
//             // Throw and error if response failed
//             if(!response.ok) {
//                 const data = await response.json()
//                 throw new Error(`[${response.status}] ${data.message}`)
//             }

//             // Request was successful, get image blob
//             const blob = await response.blob()
//             // Convert the blob to base64
//             const reader = new FileReader()
//             reader.readAsDataURL(blob)
//             reader.onloadend = () => {
//                 const base64Image = reader.result
//                 // Force the image to update
//                 setAvatar(base64Image)            
//             }
//         } catch (error) {
//             console.log(error)
//         }
//       }
      
//       if(userData.user._id) getDp()
    
//     }, [userData, avatar])
    


//     return (
//         <>
//             <Head>
//                 <title>AppointMe: Profile</title>
//             </Head>
//             <Layout page="Profile">
//                 <Box sx={userStyles.cont}>
//                     <Box sx={userStyles.profileBox}>
//                         <Badge
//                         sx={userStyles.badge}
//                             overlap="circular"
//                             anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
//                             badgeContent={
//                                 <IconButton sx={userStyles.badgeIcon} onClick={() => {setUploadDpDialog(true); console.log("CLICKED!")}}>
//                                     <ImageSearchRoundedIcon />
//                                 </IconButton>
//                             }
                            
//                         >
//                             <CustomImage style={userStyles.profilePic} alt="Profile picture" src={avatar} fallBack={<AccountCircle />} width={90} height={90} noBlur="true" />
//                         </Badge>
//                         <Typography variant="h4">
//                             {console.log(userData)}
//                             {`${userData.user.fname} ${userData.user.lname}`}
//                         </Typography>
//                     </Box>
//                     <FeatureBox
//                         sx={userStyles.profileDetailsBox}
//                         title="Personal Details" 
//                         iconLeft={<AssignmentIndRoundedIcon />}
//                         iconRight={<FiEdit fontSize="20px" />}
//                         clickRightIcon={() => setUserFormDialog(true)}
//                     >
//                         <Box sx={userStyles.profileBoxBody} >
//                             <List>
//                                 <ListItem key="address">
//                                     <LocationOnRoundedIcon />
//                                     <ListItemText sx={userStyles.listItemText}>{buildAddress(userData.user.address)}</ListItemText>
//                                 </ListItem>
//                                 <ListItem key="phone">
//                                     <LocalPhoneRoundedIcon />  
//                                     <ListItemText sx={userStyles.listItemText}>{userData.user.phone}</ListItemText>
//                                 </ListItem>
//                                 <ListItem key="email">
//                                     <AlternateEmailRoundedIcon />
//                                     <ListItemText sx={userStyles.listItemText}>{userData.user.email}</ListItemText>
//                                 </ListItem>
//                             </List>
//                         </Box>
//                     </FeatureBox>
//                     <FeatureBox
//                         sx={userStyles.accountHistoryBox}
//                         title="Account History" 
//                         iconLeft={<HistoryRoundedIcon />}
//                     >
//                         <Accordion sx={userStyles.historyAccordion} disableGutters>
//                             <AccordionSummary 
//                                 sx={userStyles.historyItem} 
//                                 key="appointment-history"
//                                 expandIcon={<ChevronRightRoundedIcon />}
//                             >
//                                 <Typography variant="body1">View Appointment History</Typography>
                                
//                             </AccordionSummary>  
//                             <AccordionDetails>
//                                 {!userData?.user?.appointments?.length && (<List>You haven&apos;t attended any appointments yet...</List>)}
//                                 <List>
//                                     {!!userData.user.appointments && userData.user.appointments.sort((a, b) => b.datetime - a.datetime).map(appointment => {
//                                         if(isPast(appointment.datetime)) {
//                                             return (
//                                                 <ListItem key={format(appointment.datetime, "dd-MMM-yyy")}>
//                                                     {format(appointment.datetime, "dd MMM yyyy")}
//                                                 </ListItem>
//                                             )
//                                         } else return
//                                     })}
//                                 </List>
//                             </AccordionDetails>  
//                         </Accordion>
//                         <Accordion sx={userStyles.historyAccordion} disableGutters>
//                             <AccordionSummary 
//                                 sx={userStyles.historyItem}  
//                                 key="payment-history"
//                                 expandIcon={<ChevronRightRoundedIcon />}
//                             >
//                                 <Typography variant="body1">View Payment History</Typography>
//                             </AccordionSummary>
//                             <AccordionDetails>
//                                 Content
//                             </AccordionDetails>
//                         </Accordion>
//                     </FeatureBox>
//                     <Dialog sx={userStyles.formDialog} fullScreen={true} open={userFormDialog} onClose={() => setUserFormDialog(false)}>
//                         <DialogTitle variant="h4" align="center">
//                             Edit Profile
//                             <IconButton
//                                 aria-label="close"
//                                 onClick={() => setUserFormDialog(false)}
//                                 sx={userStyles.closeButton}
//                             >
//                                 <CloseIcon />
//                             </IconButton>
//                         </DialogTitle>
//                         <DialogContent>
//                             <UpdateUserForm closeDialog={() => setUserFormDialog(false)} />
//                         </DialogContent>
//                     </Dialog>
//                     <Dialog sx={userStyles.formDialog} open={uploadDpDialog} onClose={() => {setUploadDpDialog(false)}}>
//                         <DialogTitle variant="h4" align="center">
//                         Edit Profile Picture
//                             <IconButton
//                                 aria-label="close"
//                                 onClick={() => setUploadDpDialog(false)}
//                                 sx={userStyles.closeButton}
//                             >
//                                 <CloseIcon />
//                             </IconButton>
//                         </DialogTitle>
//                         <DialogContent>
//                             <UploadDpForm reload={setAvatar} closeDialog={() => setUploadDpDialog(false)} />
//                         </DialogContent>
//                     </Dialog>
//                 </Box>
//             </Layout>
            
//         </>
//     )  
// }

// export default Profile


// const userStyles = {
//     cont: {
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//     },
//     profileBox: {
//         width: {xs: "100%", sm: "80%", lg: "60%"},
//         display: "flex",
//         justifyContent: {xs: "center", sm: "flex-start"},
//         alignItems: "center",
//         mt: 3,
//     },
//     profileBoxBody: {
//         color: (theme) => theme.palette.mode === 'dark' ? "custom.contrastText" : 'text.custom.highlight',
//         width: "100%",
//         px: {xs: 3},
//         pb: 2
//     },
//     badge: {
//         mx: 3,
//     },
//     badgeIcon: {
//         backgroundImage: (theme) => theme.palette.custom.gradient.iconBackground,
//     },
//     profilePic: {
//         width: 90,
//         height: 90,
//         color: "custom.contrastText"
//     },
//     profileName: {

//     },
//     profileDetailsBox: {
//         mt: 5,
//     },
//     listItemText: {
//         ml: 2,
//     },
//     accountHistoryBox: {
//         mb: 10,
//         pb: 2,
//     },
//     historyAccordion: {
//         color: (theme) => theme.palette.mode == 'dark' ? "custom.contrastText" : "custom.highlight",
//         textDecoration: "none",
//         backgroundColor: "custom.secondary.main",
//         '&:hover': {
//             backgroundImage: (theme) => theme.palette.custom.gradient.light,
//             textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
//         },
//         '&:hover .MuiSvgIcon-root': {
//             color: "common.white",
//         },
//         '&.Mui-expanded': {
//             backgroundImage: (theme) => theme.palette.custom.gradient.medium,
//             borderColor: "common.white",
//             color: "common.white",
//             textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
//         },
//         '.MuiSvgIcon-root': {
//             color: (theme) => theme.palette.mode == 'dark' ? "custom.contrastText" : "custom.highlight",
//         },
//         '.Mui-expanded .MuiSvgIcon-root': {
//             color: "common.white",
//         }
//     },
//     historyItem: {
//         backgroundImage: (theme) => theme.palette.custom.gradient.light,
//         borderBottom: "1px solid",
//         borderColor: "custom.contrastText",
//         py: 2,
//         '&:hover': {
//             backgroundImage: (theme) => theme.palette.custom.gradient.medium,
//             borderColor: "common.white",
//             color: "common.white",
//         },
//         '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//             transform: 'rotate(90deg)',
//           },
//         '& .MuiAccordionSummary-content': {
//             ml: 4,
//         },
//     },
//     formDialog: {
//         color: "custom.constrastText"
//     },
//     closeButton: {
//         position: 'absolute',
//         right: 8,
//         top: 8,
//         color: "custom.constrastText",
//     }

// }