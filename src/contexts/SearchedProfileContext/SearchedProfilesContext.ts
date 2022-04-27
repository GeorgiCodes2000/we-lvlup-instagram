/* eslint-disable no-unused-vars */
import { createContext } from 'react'
import { UserQueryType } from '../../UserQueryType'

export type SearchUserContextType = {
    searchedUser: UserQueryType[] | undefined
    setSearchedUser: (searchedUser: UserQueryType[]) => void
}

export const SearchUserContext = createContext<SearchUserContextType | null>(
    null
)
