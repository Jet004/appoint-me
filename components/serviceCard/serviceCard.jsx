import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

const ServiceCard = ({ key, text, icon}) => {
    return (
        <Card sx={styles.card}>
            <Box sx={styles.cardContent}>
                {icon(styles.icon)}
                <Divider sx={styles.divider} orientation="vertical" flexItem />
                <Typography variant="body1">{text}</Typography>
            </Box>
        </Card>
    )
}

export default ServiceCard

const styles = {
    card: {
        // backgroundColor: "custom.highlight",
        backgroundImage: (theme) => (theme.palette.custom.gradient.lift),
        color: "custom.contrastText",
        border: `1px solid`,
        borderColor: "custom.contrastTextLight",
        boxShadow: 4,
        p: {xs: "0px 16px", md: "10px 16px"},
        mb: 2,
        "&:hover": (theme) => ({...theme.palette.custom.action.cardHover})
    },
    cardContent: {
        p: {xs: "14px 4px", md: "8px 10px"},
        display: "flex",
        alignItems: "center"
    },
    divider: {
        borderColor: "custom.contrastTextLight",
        mx: 2,
        height: {xs: 50, md: 50}
    },
    icon: {
        fontSize: {xs: 30, sm: 40}
    }
}