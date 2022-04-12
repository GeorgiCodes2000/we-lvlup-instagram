/* eslint-disable no-unused-vars */
import { UserCredential } from 'firebase/auth'
import { createContext } from 'react'

export type UserContextType = {
    user: UserCredential
    setUser: (User: UserCredential | object) => void
}

export const UserContext = createContext<UserContextType | null>(null)
