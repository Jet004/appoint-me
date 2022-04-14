import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import SettingsMenu from './settings-menu'

// Styles, UI, UX imports
import Box from '@mui/material/Box'
import { Link as MuiLink } from '@mui/material'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Link from '../link'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useTheme } from '@mui/material/styles'

// Navigation link data
import navData from './navData'

// THIS WILL CHANGE
import userDataContext from '../../utility/mockData/userDataContext'


const Header = ({ page, windowWidth }) => {
    // Initialise next router
    const router = useRouter()
    // Access theme vars
    const theme = useTheme()

    // THIS WILL CHANGE
    const userData = useContext(userDataContext)
    // Get user type -- THIS IS DUMMY CODE AND NEEDS TO BE UPDATED
    const user = userData

    // Set navData based on user type
    const navLinkData = navData[user.type]

    // Control the link highlighting for page links
    const [tabValue, setTabValue] = useState(router.pathname)

    const displayHeader = (windowWidth > theme.breakpoints.values.sm && userData.loggedIn)

    return (
        <AppBar position="sticky" sx={styles.header}>
            <Toolbar>
                <MuiLink  sx={styles.header.backLink} onClick={() => router.back()}>
                    <ArrowBackIosNewIcon />
                </MuiLink>

                {displayHeader && (
                <Box sx={styles.header.appMenu}>
                    <Tabs 
                        value={tabValue} 
                        onChange={(e, newValue) => setTabValue(newValue)}
                        centered={true}
                        indicatorColor=""
                    >
                    {navLinkData.map(link => (
                        <Tab 
                            sx={styles.tabs.tab} 
                            value={link.path} 
                            key={link.text} 
                            icon={link.icon}
                            iconPosition={(windowWidth > 800) ? "start" : "top"}
                            label={link.text} 
                            href={link.path}
                            component={Link}
                            disableRipple
                        />
                    ))}
                    </Tabs>
                </Box>
                )}
                
                <Typography sx={styles.header.pageTitle} variant="h6">
                    {page}
                </Typography>

                {!userData.loggedIn && (
                    <Box sx={styles.header.links}>
                        <Link href="/login" sx={styles.header.authButtons}>Login</Link>
                        <Link href="/register" sx={styles.header.authButtons}>Register</Link>
                    </Box>
                )}
  
                <SettingsMenu />
            </Toolbar>
        </AppBar>
    )
}

export default Header

const styles = {
    header: {
        backgroundImage: "none",
        backgroundColor: "background.default",
        backLink: {
            pr: 1,
            lineHeight: 1,
            color: "custom.primaryContrastText",
            display: "flex",
            '&:hover': {
                color: 'custom.action.hover'
            },
        },
        pageTitle: {
            flexGrow: 1,
            color: 'custom.contrastText',
            display: {
                xs: 'flex',
                sm: 'none'
            }
        },
        appMenu: {
            flexGrow: 1,
            justifyContent: 'center',
        },
        links: {
            flexGrow: 1,
            display: "flex",
            justifyContent: "end"
        },
        authButtons: {
            color: "custom.primaryContrastText",
            textDecoration: "none",
            mr: 2,
            "&:hover": {
                color: "custom.action.hover"
            }
        }
    },
    tabs: {
        tab: {
            borderRadius: "20px",
            color: "custom.primaryContrastText",
            '&.Mui-selected': (theme) => ({...theme.palette.custom.action.selected}),
            '&:hover': {
                color: 'custom.action.hover'
            },
        },
    }
}