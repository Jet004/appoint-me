// Component for wrapping a title and content - usually a scrollable list
import { useTheme } from '@mui/material/styles'
import ThemeContext from '../utility/themeContext'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Icon from '@mui/material/Icon'
import SvgIcon from '@mui/material/SvgIcon'
import IconButton from '@mui/material/IconButton'


import EventRoundedIcon from '@mui/icons-material/EventRounded';

const FeatureBox = ({children, title, iconLeft, iconRight, sx, headerbg}) => {
    // Make theme accessable
    const theme = useTheme(ThemeContext)

    headerbg = headerbg === true && theme.palette.mode === 'dark' ? {backgroundImage: (theme)=> (theme.palette.custom.gradient.light)} : ""
  return (
    <>
        <Box sx={{...styles.innerBox(theme), ...sx}}>
            <Box sx={{...styles.innerBoxHeader(theme), ...headerbg}}>
                <Box sx={styles.headerContent}>
                    <Typography sx={styles.innerBoxHeaderTitle} variant="h5">
                        {iconLeft && (
                            <Icon  sx={styles.titleIcon}>
                                {iconLeft}
                            </Icon>
                        )}
                        {title}
                    </Typography>
                    {iconRight && (
                        <IconButton sx={styles.editIcon}>
                            {iconRight}
                        </IconButton>
                    )}
                </Box>
                <Divider sx={styles.innerBoxHeaderDivider} />
            </Box>
            { children }
        </Box>
    </>
  )
}

export default FeatureBox



const styles = {
    innerBox: (theme) => theme.palette.mode === 'dark' ? {
        // Dark Theme
        backgroundImage: (theme)=> (theme.palette.custom.gradient.light),
        width: {xs: "90%", md: "80%", lg: "60%"},
        minWidth: "300px",
        maxWidth: "600px",
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
    innerBoxHeader: (theme) => theme.palette.mode === 'dark' ? {
        // Dark Theme
        pt: 2,
        px: 3,
        pb: 2,
        borderRadius: "25px 25px 0px 0px",
    } : {
        // Light theme
        pt: 2,
        px: 3,
        pb: 2,
        borderRadius: "25px 25px 0px 0px",
        alignItems: "center",
    },
    headerContent: {
        display: "flex",
    },
    innerBoxHeaderTitle: {
        color: (theme) => theme.palette.mode === 'dark' ? "custom.contrastText" : 'primary.main',
        pl: {xs: 3/2, sm: 3},
        display: "flex",
        alignItems: "center",

        flexGrow: 1,
    },
    titleIcon: {
        mr: 1
    },
    editIcon: {
        color: (theme) => theme.palette.mode === 'dark' ? "custom.contrastText" : 'primary.main',
    },
    innerBoxHeaderDivider: {
        borderColor: (theme) => theme.palette.mode === 'dark' ? 'custom.contrastText' : 'custom.contrastText',
        pt: 1/2,
    },
}