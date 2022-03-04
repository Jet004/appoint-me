import React, { useState } from 'react'
import { useRouter } from 'next/router'

// Styles, UI and UX imports
import { useTheme } from '@mui/material/styles'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Link from './link'

// Navigation link data
import navData from './header/navData'

const NavMenu = ({ windowWidth }) => {
    // Make theme values available
    const theme = useTheme()
    // Make the router accessable
    const router = useRouter()
    // Get user type -- THIS IS DUMMY CODE AND NEEDS TO BE UPDATED
    const user = { type: "user" }

    // Set navData based on user type
    const navLinkData = navData[user.type]
    console.log(navLinkData)

    const [navValue, setNavValue] = useState(router.pathname)


    return (
        <>
            { windowWidth < theme.breakpoints.values.sm && (
                <BottomNavigation
                    sx={styles.navMenu}
                    value={navValue}
                    onChange={(e, newValue) => setNavValue(newValue)}
                >
            
                    {navLinkData.map((link) => (
                        <BottomNavigationAction
                            sx={styles.action}
                            label={link.text}
                            icon={link.icon}
                            href={link.path}
                            value={link.path}
                            component={Link}
                            key={link.text}
                        />
                    ))}
                </BottomNavigation>
            )}
        </>
    )
}

export default NavMenu

const styles = {
    navMenu: {
        width: 100/100,
        position: "fixed",
        left: 0,
        bottom: 0,
        display: { xs: 'flex', sm: 'none'},
        borderTop: (theme) => (`2px solid ${theme.palette.text.custom.red}`),
    },
    action: {
        color: "custom.contrastText",
        '&.Mui-selected': (theme) => ({...theme.palette.custom.action.selected}),
        '&:hover': {
            color: 'custom.action.hover'
        },
    }
}