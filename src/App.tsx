import { ReactElement, useMemo, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import './App.scss'
import { UserContext } from './UserContext'
import { NotFound } from './pages/NotFound'
import { Profile } from './pages/Profile'

function App(): ReactElement | null {
    const userObj = JSON.parse(localStorage.getItem('user') || '{}')
    const [user, setUser] = useState(userObj)

    return (
        <UserContext.Provider
            value={useMemo(
                () => ({
                    user,
                    setUser,
                }),
                [user, setUser]
            )}
        >
            <Router>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    {user.user ? <Route path="/" element={<Home />} /> : null}
                    {user.user ? (
                        <Route path="/profile" element={<Profile />} />
                    ) : null}
                    {!user.user ? (
                        <Route path="/register" element={<Register />} />
                    ) : null}
                    {!user.user ? (
                        <Route path="/login" element={<Login />} />
                    ) : null}
                </Routes>
            </Router>
        </UserContext.Provider>
    )
}
export default App
