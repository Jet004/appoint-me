import { useContext } from 'react'
import Head from 'next/head'

// Style, UI and UX
import Typography from '@mui/material/Typography'
import CustomImage from '../components/custom-image'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'

import ImageSearchRoundedIcon from '@mui/icons-material/ImageSearchRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import {FaBeer} from 'react-icons/fa'

// Components
import Layout from '../layout/layout'
import FeatureBox from '../components/featureBox'

// Mock data
import userDataContext from '../utility/mockData/userDataContext'
import { Image } from '@mui/icons-material'

const Profile = () => {
    const userData = useContext(userDataContext)

  return (
    <>
        <Head>
            <title>AppointMe: Profile</title>
        </Head>
        <Layout page="Profile">
            <Box sx={styles.cont}>
                <Box sx={styles.profileBox}>
                    <Badge
                    sx={styles.badge}
                        overlap="circular"
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        badgeContent={
                            <IconButton sx={styles.badgeIcon}>
                                <ImageSearchRoundedIcon />
                            </IconButton>
                        }
                    >
                        <CustomImage style={styles.profilePic} alt="Profile picture" src={userData.profile} />
                    </Badge>
                    <Typography variant="h4">
                        {console.log(userData)}
                        {`${userData.user.fname} ${userData.user.lname}`}
                    </Typography>
                </Box>
                <FeatureBox
                    sx={styles.detailsBox}
                    title="Personal Details" 
                    iconLeft={<AssignmentIndRoundedIcon />}
                    iconRight={<FaBeer />}
                >
                    Content
                </FeatureBox>
            </Box>
        </Layout>
        
    </>
  )
}

export default Profile


const styles = {
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
    innerBox: (theme) => theme.palette.mode === 'dark' ? {
        // Dark Theme
        backgroundImage: (theme)=> (theme.palette.custom.gradient.light),
        width: {xs: "90%", md: "80%", lg: "60%"},
        minWidth: "300px",
        maxWidth: "600px",
        height: "40vh",
        mt: 2,
        borderRadius: "25px",
        overflow: "hidden",
    } : {
        // Light Theme
        width: {xs: "100%", md: "80%", lg: "60%"},
        minWidth: "300px",
        maxWidth: "600px",
        mt: 2,
        borderRadius: "25px",
        overflow: "hidden",
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
    detailsBox: {
        mt: 5,
    }
}