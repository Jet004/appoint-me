import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'

// Styles, UI and UX imports
import { useTheme } from '@mui/material/styles'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Link from './link'
import Paper from '@mui/material/Paper'

// THIS WILL CHANGE
import userContext from '../utility/mockData/userContext'

// Navigation link data
import navData from './header/navData'

const NavMenu = ({ windowWidth }) => {
    // Make theme values available
    const theme = useTheme()
    // Make the router accessable
    const router = useRouter()

    // THIS WILL CHANGE
    const user = useContext(userContext)

    // Set navData based on user type
    const navLinkData = navData[user.userType]

    const [navValue, setNavValue] = useState(router.asPath)

    return (
        <>
            { windowWidth < theme.breakpoints.values.sm && (
                <Paper elevation={3} sx={styles.bottomNav}>
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
                                href={link.path} // The business ID is currently hardcoded and will be made dynamic when the business registry is implemented
                                value={link.path}
                                component={Link}
                                key={link.text}
                                disableRipple
                            />
                        ))}
                    </BottomNavigation>
                </Paper>
            )}
        </>
    )
}

export default NavMenu

const styles = {
    bottomNav: {
        position: "fixed",
        left: 0,
        bottom: 0,
        width: 100/100,
        display: { xs: 'flex', sm: 'none'},
    },
    navMenu: {
        pt: 1,
        px: 1,
        width: 100/100,
        "&:before": (theme) => theme.palette.mode === 'dark' ? {
            content: "''",
            position: "absolute",
            top: 0,
            left: "7.5%",
            width: "85%",
            height: "1px",
            borderTop: (theme) => (`1.5px solid ${theme.palette.text.custom.red}`),
        }: {}
    },
    action: {
        color: "custom.contrastText",
        '&.Mui-selected': (theme) => ({...theme.palette.custom.action.selected}),
        '&:hover': {
            color: 'custom.action.hover'
        },
    }
}