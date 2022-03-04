
import React, { createContext } from 'react'


const userDataContext = createContext({
    user: {},
    getUsers: () => {},
    getUserByID: () => {},
    createUser: () => {},
    updateUser: () => {},
    toggleUserType: () => {}
})

export default userDataContext