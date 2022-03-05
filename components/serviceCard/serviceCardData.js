import WorkRoundedIcon from '@mui/icons-material/WorkRounded'; // Business Profile
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded'; // Services
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded'; // View calendar
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'; // Make apointment

export const serviceData = [
    {
        title: "services",
        icon: (sx) => (<InventoryRoundedIcon sx={sx} />),
        text: "Learn about our services",
        path: "/services"
    },
    {
        title: "appointment",
        icon: (sx) => (<InsertInvitationRoundedIcon sx={sx} />),
        text: "View available appointments",
        path: "/appointments"
    },
    {
        title: "makeAppointment",
        icon: (sx) => (<EventAvailableRoundedIcon sx={sx} />),
        text: "Make an appointment",
        path: "/make-appointment"
    },
    {
        title: "about",
        icon: (sx) => (<WorkRoundedIcon sx={sx} />),
        text: "Learn more about us",
        path: "/about"
    }
]