import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { UserProvider } from './contexts/UserContext/UserProvider'

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
