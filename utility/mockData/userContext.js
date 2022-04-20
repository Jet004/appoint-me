
import React, { createContext } from 'react'


const userContext = createContext({
    loggedIn: false,
    userType: null,
    user: {},
    login: () => {},
    update: () => {},
    logout: () => {}
})

export default userContext