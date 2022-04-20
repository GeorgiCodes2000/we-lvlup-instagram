/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import { useState, FC } from 'react'
import { SearchUserContext } from './SearchedProfilesContext'
import { UserQueryType } from './UserQueryType'

export const SearchUserProvider: FC = ({ children }) => {
    const [searchedUser, setSearchedUser] = useState<
        UserQueryType[] | undefined
    >()

    return (
        <SearchUserContext.Provider
            value={{
                searchedUser,
                setSearchedUser,
            }}
        >
            {children}
        </SearchUserContext.Provider>
    )
}
