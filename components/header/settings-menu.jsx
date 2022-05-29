import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import localForage from 'localforage'
import ThemeContext from '../../utility/themeContext'
import { useTheme } from '@mui/material/styles'
import userContext from '../../utility/appContext'

// Import components
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Switch from '@mui/material/Switch'

// Import Icons
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import { RiContrast2Fill } from 'react-icons/ri'
import Tune from '@mui/icons-material/Tune'


const SettingsMenu = () => {
    // Set the anchor element for settings menu
    const [anchor, setAnchor] = useState(null)

    // Set up router for redirecting after logout
    const router = useRouter()

    // Pass theme toggler function to variable
    const colourMode = useContext(ThemeContext)
    // THIS WILL CHANGE
    const userData = useContext(userContext)

    // Get theme values
    const theme = useTheme()

    // Open/close menu
    const toggleSettingsMenu = (e) => {
        setAnchor((prev) => prev === null ? "right" : null)
    }

    const toggleTheme = () => {
        colourMode.toggleColourMode()
    }

    // This feature is disabled at the moment and may not be implemented in future versions
    // const toggleUserType = () => {
    //     userData.toggleUserType()
    // }

    const logout = async () => {
        userData.logout()
        await localForage.removeItem('accessToken')
        await localForage.removeItem('refreshToken')
        router.push('/login')
    }

    return (
        <Box>
            <IconButton type="button" onClick={toggleSettingsMenu} sx={styles.settingsMenu}>
                <Tune></Tune>
            </IconButton>
            <SwipeableDrawer
                sx={styles.drawer}
                open={Boolean(anchor)}
                anchor="right"
                onClose={toggleSettingsMenu}
                onOpen={toggleSettingsMenu}
            >
                <List sx={styles.list}>
                    <ListItem
                        sx={styles.listText}
                        button 
                        disableRipple
                    >
                        <ListItemIcon sx={styles.listIcon}>
                            <RiContrast2Fill />
                        </ListItemIcon>
                        <ListItemText primary="Dark Mode" id="theme-toggle" />
                        <Switch 
                            checked={theme.palette.mode === 'dark'}
                            onChange={() => {toggleTheme()}}
                        />
                    </ListItem>
                    <ListItem 
                        sx={styles.listText}
                        button
                        disableRipple
                        onClick={() => router.push('/help')}
                    >
                        <ListItemIcon sx={styles.listIcon}>
                            <HelpRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Help" />
                    </ListItem>
                    {/* This feature is disabled at the moment and may not be implemented in future versions
                    <ListItem 
                        sx={styles.listText}
                        button disableRipple
                    >
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText sx={styles.listText} primary="Toggle User Type" id="user-toggle" />
                        <Switch 
                            checked={userData.type === 'user'}
                            onChange={() => {toggleUserType()}}
                        />
                    </ListItem> */}
                    {userData.loggedIn && (
                        <ListItem 
                            sx={styles.listText}
                            button 
                            disableRipple
                            onClick={() => {logout()}}
                        >
                            <ListItemIcon>

                            </ListItemIcon>
                            <ListItemText sx={styles.listText} primary="Log Out" />
                        </ListItem>
                    )}
                </List>
            </SwipeableDrawer>
        </Box>
    )
}

export default SettingsMenu


const styles = {
    settingsMenu: {
        color: 'custom.contrastText',
        '&:hover': {
            color: '#fff',
        },
    },
    drawer: {
        
    },
    list: {
        width: '100%',
    },
    listIcon: {
        color: 'custom.contrastText',
        justifyContent: 'center',
        '& > svg': {
            fontSize: '1.3em',
        }
    },
    listItem: {
        
    },
    listText: {
        color: "custom.primaryContrastText",
        '&:hover': {
            color: 'custom.action.hover'
        },
        flexGrow: 1,
    }
}