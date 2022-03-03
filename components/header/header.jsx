import React from 'react'
import { useRouter } from 'next/router'
import SettingsMenu from '../settings-menu'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useTheme } from '@mui/material/styles'


const Header = ({ page }) => {
    // Initialise next router
    const router = useRouter()
    // Access theme vars
    const theme = useTheme()
    return (
        <AppBar position="sticky" sx={styles.header}>
            <Toolbar>
                <Link sx={styles.header.backLink} onClick={() => router.back()}>
                    <ArrowBackIosNewIcon />
                </Link>

                <Box sx={styles.header.appMenu}>

                </Box>


                <Typography sx={styles.header.pageTitle} variant="h5">
                    {page}
                </Typography>
                <SettingsMenu />
            </Toolbar>
        </AppBar>
    )
}

export default Header

const styles = {
    header: {
        backLink: {
            pr: 2,
            lineHeight: 1,
            color: "common.white",
            display: "flex",
            alignItems: "center"
        },
        pageTitle: {
            flexGrow: 1,
            display: {
                xs: 'flex',
                sm: 'none'
            }
        },
        appMenu: {
            flexGrow: 1,
            display: {xs: 'none', sm: 'flex'}
        }
    }
}