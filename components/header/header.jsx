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
import userContext from '../../utility/mockData/appContext'


const Header = ({ page, windowWidth }) => {
    // Initialise next router
    const router = useRouter()
    // Access theme vars
    const theme = useTheme()

    // THIS WILL CHANGE
    const userData = useContext(userContext)
    // Get user type -- THIS IS DUMMY CODE AND NEEDS TO BE UPDATED
    const user = userData

    // Set navData based on user type
    const navLinkData = navData[user.userType]

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
                        <Link { ...(router.asPath === "/login") && ({className: "selected"})} href="/login" sx={styles.header.authButtons}>Login</Link>
                        <Link { ...(router.asPath === "/register") && ({className: "selected"})} href="/register" sx={styles.header.authButtons}>Register</Link>
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
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? "background.default" : "background.transparent",
        backdropFilter: "blur(10px)",
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
            },
            justifyContent: "center",
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
            color: "custom.contrastText",
            textDecoration: "none",
            mr: 2,
            "&:hover": {
                color: "custom.action.hover"
            },
            '&.selected': {
                color: 'primary.main',
            }
        }
    },
    tabs: {
        tab: {
            borderRadius: "20px",
            color: "custom.contrastText",
            '&.Mui-selected': (theme) => ({...theme.palette.custom.action.selected}),
            '&:hover': {
                color: 'custom.action.hover'
            },
        },
    }
}