import {createContext} from 'react'
import type {User} from '../models/auth/user.ts'

export type SecurityContext = {
    isInitialised: boolean
    isAuthenticated: () => boolean
    loggedInUser: User | undefined
    login: () => void
    logout: () => void
}

export default createContext<SecurityContext>({
    isInitialised: false,
    isAuthenticated: () => false,
    loggedInUser: undefined,
    login: () => {
    },
    logout: () => {
    },
})
