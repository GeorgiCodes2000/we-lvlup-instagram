/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import { useState, FC } from 'react'
import { UserContext } from './UserContext'

export const UserProvider: FC = ({ children }) => {
    const userObj = JSON.parse(localStorage.getItem('user') || '{}')

    const [user, setUser] = useState(userObj)

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
