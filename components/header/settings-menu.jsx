import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'

// Style and UX
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tune from '@mui/icons-material/Tune'
import { RiContrast2Fill } from 'react-icons/ri'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Switch from '@mui/material/Switch'

// Set context objects
import ThemeContext from '../../utility/themeContext'
import { useTheme } from '@mui/material/styles'
// THIS WILL CHANGE
import userDataContext from '../../utility/mockData/userDataContext'

const SettingsMenu = () => {
    // Set the anchor element for settings menu
    const [anchor, setAnchor] = useState(null)

    // Set up router for redirecting after logout
    const router = useRouter()

    // Pass theme toggler function to variable
    const colourMode = useContext(ThemeContext)
    // THIS WILL CHANGE
    const userData = useContext(userDataContext)

    // Get theme values
    const theme = useTheme()

    // Open/close menu
    const toggleSettingsMenu = (e) => {
        setAnchor((prev) => prev === null ? "right" : null)
    }

    const toggleTheme = () => {
        colourMode.toggleColourMode()
    }

    const toggleUserType = () => {
        userData.toggleUserType()
    }

    const logout = () => {
        userData.logout()
        router.push('/login')
    }
console.log(userData)
    // THIS COMPONENT SHOULD USE MUI DRAWER AND LIST

    // {theme.palette.mode.toUpperCase()} Theme
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
                        button disableRipple
                    >
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText sx={styles.listText} primary="Toggle User Type" id="user-toggle" />
                        <Switch 
                            checked={userData.type === 'user'}
                            onChange={() => {toggleUserType()}}
                        />
                    </ListItem>
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
    drawer: {
        
    },
    list: {
        width: '100%',
    },
    listIcon: {
        color: 'custom.contrastText',
        justifyContent: 'center',
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