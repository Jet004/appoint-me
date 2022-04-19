import { useContext, useState } from 'react'
import Head from 'next/head'
import { buildAddress } from '../utility/helperFunctions'

// Style, UI and UX
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import CustomImage from '../components/custom-image'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import Link from '../components/link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import ImageSearchRoundedIcon from '@mui/icons-material/ImageSearchRounded'
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded'
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { FiEdit } from 'react-icons/fi'


// Components
import Layout from '../layout/layout'
import FeatureBox from '../components/featureBox'

// date-fns
import format from 'date-fns/format'
import isPast from 'date-fns/isPast'

// User data
import userContext from '../utility/mockData/userContext'

const Profile = () => {
    const userData = useContext(userContext)
    // Handle sub-menu for account history links
    const [appointmentHistoryEl, setAppointmentHistoryEl] = useState(null)
    const [paymentHistoryEl, setPaymentHistoryEl] = useState(null)
    console.log(userData)
    if(userData.userType === 'user') {
        // User profile


        return (
            <>
                <Head>
                    <title>AppointMe: Profile</title>
                </Head>
                <Layout page="Profile">
                    <Box sx={userStyles.cont}>
                        <Box sx={userStyles.profileBox}>
                            <Badge
                            sx={userStyles.badge}
                                overlap="circular"
                                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                badgeContent={
                                    <IconButton sx={userStyles.badgeIcon}>
                                        <ImageSearchRoundedIcon />
                                    </IconButton>
                                }
                            >
                                {/* <CustomImage style={userStyles.profilePic} alt="Profile picture" src={userData.profile} /> */}
                            </Badge>
                            <Typography variant="h4">
                                {console.log(userData)}
                                {`${userData.user.fname} ${userData.user.lname}`}
                            </Typography>
                        </Box>
                        <FeatureBox
                            sx={userStyles.profileDetailsBox}
                            title="Personal Details" 
                            iconLeft={<AssignmentIndRoundedIcon />}
                            iconRight={<FiEdit fontSize="20px" />}
                        >
                            <Box sx={userStyles.profileBoxBody} >
                                <List>
                                    <ListItem key="address">
                                        <LocationOnRoundedIcon />
                                        <ListItemText sx={userStyles.listItemText}>{buildAddress(userData.user.address)}</ListItemText>
                                    </ListItem>
                                    <ListItem key="phone">
                                        <LocalPhoneRoundedIcon />  
                                        <ListItemText sx={userStyles.listItemText}>{userData.user.phone}</ListItemText>
                                    </ListItem>
                                    <ListItem key="email">
                                        <AlternateEmailRoundedIcon />
                                        <ListItemText sx={userStyles.listItemText}>{userData.user.email}</ListItemText>
                                    </ListItem>
                                </List>
                            </Box>
                        </FeatureBox>
                        <FeatureBox
                            sx={userStyles.accountHistoryBox}
                            title="Account History" 
                            iconLeft={<HistoryRoundedIcon />}
                        >
                            <Accordion sx={userStyles.historyAccordion} disableGutters>
                                <AccordionSummary 
                                    sx={userStyles.historyItem} 
                                    button 
                                    key="appointment-history"
                                    expandIcon={<ChevronRightRoundedIcon />}
                                >
                                    <Typography variant="body1">View Appointment History</Typography>
                                    
                                </AccordionSummary>  
                                <AccordionDetails>
                                    {!userData.user.appointments.length && (<List>No appointment history. Go to the <Link href={`/business-profile/5ee9f9f8f9f9f9f9f9f9f9f9`}>services</Link> page if you would like to make an appointment.</List>)}
                                    <List>
                                        {userData.user.appointments.sort((a, b) => b.datetime - a.datetime).map(appointment => {
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
                            <Accordion sx={userStyles.historyAccordion} disableGutters>
                                <AccordionSummary 
                                    sx={userStyles.historyItem} 
                                    button 
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
                    </Box>
                </Layout>
                
            </>
          )
    } else {
        // Business profile

        return (
            <>
                <Head>
                    <title>AppointMe: Profile</title>
                </Head>
                <Layout page="Profile">
                    <Box sx={userStyles.cont}>
                        <Box sx={userStyles.profileBox}>
                            <Badge
                            sx={userStyles.badge}
                                overlap="circular"
                                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                badgeContent={
                                    <IconButton sx={userStyles.badgeIcon}>
                                        <ImageSearchRoundedIcon />
                                    </IconButton>
                                }
                            >
                                {/* <CustomImage style={userStyles.profilePic} alt="Profile picture" src={userData.profile} /> */}
                            </Badge>
                            <Typography variant="h4">
                                {`${userData.user.fname} ${userData.user.lname}`}
                            </Typography>
                        </Box>
                        <FeatureBox
                            sx={userStyles.detailsBox}
                            title="Personal Details" 
                            iconLeft={<AssignmentIndRoundedIcon />}
                            iconRight={<FiEdit />}
                        >
                            Content
                        </FeatureBox>
                        <FeatureBox
                            sx={userStyles.detailsBox}
                            title="Personal Details" 
                            iconLeft={<AssignmentIndRoundedIcon />}
                            iconRight={<FiEdit />}
                        >
                            Content
                        </FeatureBox>
                        
                    </Box>
                </Layout>
                
            </>
        )


    }



  
}

export default Profile


const userStyles = {
    cont: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    profileBox: {
        width: {xs: "100%", md: "80%", lg: "60%"},
        display: "flex",
        justifyContent: {xs: "center", sm: "flex-start"},
        alignItems: "center",
        mt: 3,
    },
    profileBoxBody: {
        color: "custom.contrastText",
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
        height: "auto",
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
        color: "custom.contrastText",
        textDecoration: "none",
        '&:hover': {
         backgroundImage: (theme) => theme.palette.custom.gradient.light   
        },
        '&.Mui-expanded': {
            backgroundImage: (theme) => theme.palette.custom.gradient.medium,
            borderColor: "common.white",
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
}