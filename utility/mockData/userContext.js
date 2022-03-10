// This is dummy user data to simulate fetching user data from the backend

// Images
import profile2 from '../../public/images/mock-profile/profile-2.jpeg'


export const users = [
    {
        id: 1,
        fname: "Eric",
        lname: "Tanner",
        email: "e.tanner@gmail.com",
        phone: "0444 982 749",
        address: "34 Milton Pde, Milstone, Briskvegan",
        profile: profile2,
        appointments: [
            {
                service: 'Individual',
                datetime: new Date(2022, 2, 1, 15),
                fee: "50",
                feeDueDate: new Date(2022, 2, 5),
                paymentStatus: "paid",
                paymentDate: ""
            },
            {
                service: 'Individual',
                datetime: new Date(2022, 2, 2, 15),
                fee: "50",
                feeDueDate: new Date(2022, 2, 7),
                paymentStatus: "paid"
            },
            {
                service: 'Individual',
                datetime: new Date(2022, 2, 4, 15),
                fee: "50",
                feeDueDate: new Date(2022, 2, 9),
                paymentStatus: "unpaid"
            },
            {
                service: 'Individual',
                datetime: new Date(2022, 2, 8, 23, 59),
                fee: "50",
                feeDueDate: new Date(2022, 2, 13),
                paymentStatus: "unpaid"
            },
            {
                service: 'Individual',
                datetime: new Date(2022, 2, 10, 15),
                fee: "50",
                feeDueDate: new Date(2022, 2, 15),
                paymentStatus: "unpaid"
            },
            {
                service: 'Pronunciation',
                datetime: new Date(2022, 2, 10, 16),
                fee: "50",
                feeDueDate: new Date(2022, 2, 15),
                paymentStatus: "unpaid"
            },
            {
                service: 'Individual',
                datetime: new Date(2022, 2, 11, 11),
                fee: "50",
                feeDueDate: new Date(2022, 2, 15),
                paymentStatus: "unpaid"
            },
            {
                service: 'Individual',
                datetime: new Date(2022, 2, 15, 13),
                fee: "50",
                feeDueDate: new Date(2022, 2, 15),
                paymentStatus: "unpaid"
            },
            {
                service: 'Individual',
                datetime: new Date(2022, 2, 16, 13),
                fee: "50",
                feeDueDate: new Date(2022, 2, 22),
                paymentStatus: "unpaid"
            },
            {
                service: 'Individual',
                datetime: new Date(2022, 2, 18, 13),
                fee: "50",
                feeDueDate: new Date(2022, 2, 23),
                paymentStatus: "unpaid"
            },
        ]
    },
    {
        id: 2,
        fname: "Yennefer",
        lname: "Blascomfen",
        email: "yennefer1234@outlook.com"
    },
    {
        id: 3,
        fname: "Phil",
        lname: "Hope",
        email: "phil.hope@tafe.qld.edu.au"
    }
]


export const getUsers = () => {
    return users
}

export const getUserById = (id) => {
    return users.filter((user) => {console.log(user);  return user.id === id})[0]
}

export const createUser = (user) => {
    user.id = users.length + 1
    users.push(user)
    return true
}

export const updateUser = (userData) => {
    user = users.filter(user => user.id === id)
    user = userData
    return user
}