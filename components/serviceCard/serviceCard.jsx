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
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))",
        color: "custom.contrastText",
        border: `1px solid`,
        borderColor: "custom.contrastText",
        p: {xs: "0px 16px", md: "10px 20px"},
        mb: 2,
    },
    cardContent: {
        p: {xs: "14px 4px", md: "8px 10px"},
        display: "flex",
        alignItems: "center"
    },
    divider: {
        borderColor: "rgba(255, 255, 255, 0.25)",
        mx: 2,
        height: {xs: 70, md: 80}
    },
    icon: {
        fontSize: 40
    }
}