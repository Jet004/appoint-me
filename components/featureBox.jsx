// Component for wrapping a title and content - usually a scrollable list
import { useTheme } from '@mui/material/styles'
import ThemeContext from '../utility/themeContext'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Icon from '@mui/material/Icon'
import SvgIcon from '@mui/material/SvgIcon'
import IconButton from '@mui/material/IconButton'


const FeatureBox = ({children, title, iconLeft, iconRight, clickRightIcon, sx}) => {
    // Make theme accessable
    const theme = useTheme(ThemeContext)

  return (
    <>
        <Box sx={{...styles.innerBox, ...sx}}>
            <Box sx={{...styles.innerBoxHeader(theme)}}>
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
                        <IconButton sx={styles.editIcon} onClick={clickRightIcon}>
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
    innerBox: {
        // Dark Theme
        backgroundImage: (theme) => theme.palette.mode === "dark" 
            ? (theme.palette.custom.gradient.light)
            : (theme.palette.custom.gradient.secondary.main),
        width: {xs: "90%", md: "80%", lg: "60%"},
        minWidth: "340px",
        maxWidth: "600px",
        mt: 2,
        borderRadius: "20px",
        boxShadow: 14,
    },
    innerBoxHeader: (theme) => theme.palette.mode === 'dark' ? {
        // Dark Theme
        pt: 2,
        px: 3,
        pb: 2,
        borderRadius: "15px 15px 0px 0px",
    } : {
        // Light theme
        pt: 2,
        px: 3,
        pb: 2,
        alignItems: "center",
    },
    headerContent: {
        display: "flex",
    },
    innerBoxHeaderTitle: {
        color: (theme) => theme.palette.mode === 'dark' ? "custom.contrastText" : 'text.custom.highlight',
        pl: {xs: 1, sm: 3},
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
    },
    titleIcon: {
        mr: 1
    },
    editIcon: {
        color: (theme) => theme.palette.mode === 'dark' ? "custom.contrastText" : 'text.custom.highlight',
        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
    },
    innerBoxHeaderDivider: {
        borderColor: (theme) => theme.palette.mode === 'dark' ? 'custom.contrastText' : 'text.custom.highlight',
        pt: 1/2,
        boxShadow: 1
    },
}