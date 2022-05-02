
// Import components
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// Import icons
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'

// Import date functions
import format from 'date-fns/format'
import addMonths from 'date-fns/addMonths'

const MonthCarosel = ({ pickedDate, setPickedDate }) => {

    return (
        <>
            <Box sx={styles.MonthCarosel}>
                <IconButton type="button">
                    <KeyboardArrowLeftRoundedIcon
                        sx={styles.arrowIcon}
                        onClick={() => setPickedDate(addMonths(pickedDate, -1))}  
                    />
                </IconButton>
                <Typography>{format(new Date(pickedDate), "MMMM")}</Typography>
                <IconButton>
                    <KeyboardArrowRightRoundedIcon
                        sx={styles.arrowIcon} 
                        onClick={() => setPickedDate(addMonths(pickedDate, 1))}    
                    />
                </IconButton>
                
            </Box>
        </>
    )
}

export default MonthCarosel

const styles = {
    MonthCarosel: {
        minWidth: 175,
        pt: 1,
        color: "custom.contrastText",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        '& svg': {
            color: "custom.contrastText",
        },
    },
    arrowIcon: {
        fontSize: 30,
    },
}