/* eslint-disable no-unused-vars */
import { createContext } from 'react'

export type SearchInputContextType = {
    input: string
    setInput: (input: string) => void
}

export const SearchInputContext = createContext<SearchInputContextType | null>(
    null
)
