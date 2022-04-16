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
            text: 'Services',
            icon: <WorkIcon />,
            path: '/business-profile'
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
            text: 'Business',
            icon: <WorkIcon />,
            path: '/business-profile'
        },
        {
            text: 'Clients',
            icon: <RecentActorsRoundedIcon />,
            path: '/client-list'
        }
    ]
}

export default navData