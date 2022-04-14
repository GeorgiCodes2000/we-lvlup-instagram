/* eslint-disable react/jsx-no-bind */
import { ReactElement, useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
    collection,
    query,
    where,
    getDocs,
    CollectionReference,
} from 'firebase/firestore'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import './App.scss'
import { UserContext } from './UserContext'
import { NotFound } from './pages/NotFound'
import { Profile } from './pages/Profile'
import { UserQueryType } from './UserQueryType.js'
import { db } from './firebase.config.js'

function App(): ReactElement | null {
    const userContext = useContext(UserContext)

    const [profileUser, SetProfileUser] = useState<UserQueryType | undefined>()

    async function getProfile(): Promise<void> {
        const usersRef = collection(
            db,
            'users'
        ) as CollectionReference<UserQueryType>
        const q = await query(
            usersRef,
            where('registerEmail', '==', userContext?.user?.user?.email)
        )

        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doC) => {
            if (doC.data()) {
                const obj = { ...doC.data() }
                obj.id = doC.id
                SetProfileUser(obj)
            }
        })
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFound />} />
                {userContext?.user.user ? (
                    <Route path="/" element={<Home />} />
                ) : null}
                {userContext?.user.user ? (
                    <Route
                        path="/profile"
                        element={
                            <Profile
                                profileUser={profileUser}
                                getProfile={getProfile}
                            />
                        }
                    />
                ) : null}
                {!userContext?.user.user ? (
                    <Route path="/register" element={<Register />} />
                ) : null}
                {!userContext?.user.user ? (
                    <Route path="/login" element={<Login />} />
                ) : null}
            </Routes>
        </Router>
    )
}
export default App
