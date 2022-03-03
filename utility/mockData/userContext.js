// This is dummy user data to simulate fetching user data from the backend



const users = [
    {
        id: 1,
        fname: "John",
        lname: "Willow",
        email: "jwillow@gmail.com"
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