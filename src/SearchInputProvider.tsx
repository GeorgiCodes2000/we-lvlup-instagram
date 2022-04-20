/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import { useState, FC } from 'react'
import { SearchInputContext } from './SearchInputContext'

export const SerachInputProvider: FC = ({ children }) => {
    const [input, setInput] = useState('')

    return (
        <SearchInputContext.Provider
            value={{
                input,
                setInput,
            }}
        >
            {children}
        </SearchInputContext.Provider>
    )
}
