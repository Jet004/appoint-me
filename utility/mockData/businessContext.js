// This is dummy user data to simulate fetching user data from the backend

export const users = [
    {
        id: 1,
        fname: "Penny",
        lname: "Wong",
        email: "penny.wong@jetmandarin.com"
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