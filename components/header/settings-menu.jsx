import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'

// Style and UX
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tune from '@mui/icons-material/Tune'

// Set context objects
import ThemeContext from '../../utility/themeContext'
import { useTheme } from '@mui/material/styles'
// THIS WILL CHANGE
import userDataContext from '../../utility/mockData/userDataContext'

const SettingsMenu = () => {
    // Set the anchor element for settings menu
    const [anchorElem, setAnchorElem] = useState(null)

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
        setAnchorElem((prev) => prev === null ? e.target : null)
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

    // THIS COMPONENT SHOULD USE MUI DRAWER AND LIST

    // {theme.palette.mode.toUpperCase()} Theme
    return (
        <Box>
            <IconButton type="button" onClick={toggleSettingsMenu} sx={styles.settingsMenu}>
                <Tune></Tune>
            </IconButton>
            <Menu
                open={Boolean(anchorElem)}
                anchorEl={anchorElem}
                onClose={toggleSettingsMenu}
            >
                <MenuItem onClick={() => {toggleTheme(); toggleSettingsMenu()}}>
                    {theme.palette.mode === 'dark' ? "Light" : "Dark"} Theme
                </MenuItem>
                <MenuItem onClick={() => {toggleUserType(); toggleSettingsMenu()}}>
                    Toggle User Type
                </MenuItem>
                {userData.loggedIn && (
                    <MenuItem onClick={() => {logout(); toggleSettingsMenu()}}>
                        Log Out
                    </MenuItem>
                )}
            </Menu>
            
        </Box>
    )
}

export default SettingsMenu


const styles = {
    settingsMenu: {
        color: "custom.primaryContrastText",
        '&:hover': {
            color: 'custom.action.hover'
        }
    }
}