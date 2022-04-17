import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import RecentActorsRoundedIcon from '@mui/icons-material/RecentActorsRounded';

const navData = {
    user: [
        {
            text: 'Home',
            icon: <HomeRoundedIcon />,
            path: '/home'
        },
        {
            text: 'Profile',
            icon: <PersonIcon />,
            path: '/profile'
        },{
            text: 'Calendar',
            icon: <CalendarTodayRoundedIcon />,
            path: '/calendar'
        },{
            text: 'Services', // This will change to business registry in a future iteration
            icon: <WorkIcon />,
            path: '/business-profile/5ee9f9f8f9f9f9f9f9f9f9f9' // The business ID is currently hardcoded
        },
    ],
    businessRep: [
        {
            text: 'Home',
            icon: <HomeRoundedIcon />,
            path: '/home'
        },
        {
            text: 'Profile',
            icon: <PersonIcon />,
            path: '/profile'
        },
        {
            text: 'Calendar',
            icon: <CalendarTodayRoundedIcon />,
            path: '/calendar'
        },
        {
            text: 'Clients',
            icon: <RecentActorsRoundedIcon />,
            path: '/client-list'
        },
        {
            text: 'Business', // This will not change when the business registry is implemented
            icon: <WorkIcon />,
            path: '/business-profile/5ee9f9f8f9f9f9f9f9f9f9f9' // The business ID is currently hardcoded
        }
    ]
}

export default navData