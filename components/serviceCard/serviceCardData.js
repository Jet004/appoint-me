import WorkRoundedIcon from '@mui/icons-material/WorkRounded' // Business Profile
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded' // Services
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded' // View calendar
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded' // Make apointment
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded'; // Access control

export const serviceData = {
    unauthenticated: [
        {
            title: "services",
            icon: (sx) => (<InventoryRoundedIcon sx={sx} />),
            text: "Learn about our services",
            path: "/business-profile/services/5ee9f9f8f9f9f9f9f9f9f9f9" // The business ID is currently hardcoded
        },
        {
            title: "appointment",
            icon: (sx) => (<InsertInvitationRoundedIcon sx={sx} />),
            text: "View available appointments",
            path: "/business-profile/appointments/5ee9f9f8f9f9f9f9f9f9f9f9" // The business ID is currently hardcoded
        },
        {
            title: "about",
            icon: (sx) => (<WorkRoundedIcon sx={sx} />),
            text: "Learn more about us",
            path: "/business-profile/about/5ee9f9f8f9f9f9f9f9f9f9f9" // The business ID is currently hardcoded
        }
    ],
    user: [
        {
            title: "services",
            icon: (sx) => (<InventoryRoundedIcon sx={sx} />),
            text: "Learn about our services",
            path: "/business-profile/services/5ee9f9f8f9f9f9f9f9f9f9f9" // The business ID is currently hardcoded
        },
        {
            title: "makeAppointment",
            icon: (sx) => (<EventAvailableRoundedIcon sx={sx} />),
            text: "Make an appointment",
            path: "/business-profile/appointments/5ee9f9f8f9f9f9f9f9f9f9f9" // The business ID is currently hardcoded
        },
        {
            title: "about",
            icon: (sx) => (<WorkRoundedIcon sx={sx} />),
            text: "Learn more about us",
            path: "/business-profile/about/5ee9f9f8f9f9f9f9f9f9f9f9"
        }
    ],
    businessRep: [
        {
            title: "services",
            icon: (sx) => (<InventoryRoundedIcon sx={sx} />),
            text: "Manage services",
            path: "/admin/services/5ee9f9f8f9f9f9f9f9f9f9f9"
        },
        {
            title: "access",
            icon: (sx) => (<ShieldRoundedIcon sx={sx} />),
            text: "Manage access privileges",
            path: "/admin/access/5ee9f9f8f9f9f9f9f9f9f9f9"
        }
        // {
        //     title: "business",
        //     icon: (sx) => (<WorkRoundedIcon sx={sx} />),
        //     text: "Manage business profile",
        //     path: "/admin/business/5ee9f9f8f9f9f9f9f9f9f9f9"
        // }
    ]
}