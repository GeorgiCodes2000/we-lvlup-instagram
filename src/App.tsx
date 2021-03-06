/* eslint-disable react/jsx-no-bind */
import {
    lazy,
    ReactElement,
    Suspense,
    useContext,
    useEffect,
    useState,
} from 'react'
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
// import { Home } from './pages/Home'

import './App.scss'
import { NotFound } from './pages/NotFound'
// import { Profile } from './pages/Profile'
import { UserQueryType } from './UserQueryType.js'
import { db } from './firebase.config.js'
import { SearchUserProvider } from './contexts/SearchedProfileContext/SearchedProfilesProvider'
// import { ProfileForeign } from './pages/PorfileForeign'
import { UserContext } from './contexts/UserContext/UserContext'
import { SerachInputProvider } from './contexts/SearchInputContext/SearchInputProvider'
import Upload from './pages/Upload'
import { PostPreview } from './pages/PostPreview'
import { Loading } from './components/Loading'
import Navbar from './components/Navbar'
// import { Chat } from './pages/Chat'

const Home = lazy(() => import('./pages/Home'))
const ProfileForeign = lazy(() => import('./pages/PorfileForeign'))
const Profile = lazy(() => import('./pages/Profile'))
const Chat = lazy(() => import('./pages/Chat'))

function App(): ReactElement | null {
    const userContext = useContext(UserContext)

    const [profileUser, SetProfileUser] = useState<UserQueryType | undefined>()

    async function getProfile(): Promise<void> {
        if (userContext?.user?.user?.email) {
            const usersRef = collection(
                db,
                'users'
            ) as CollectionReference<UserQueryType>
            const q = await query(
                usersRef,
                where('registerEmail', '==', userContext?.user?.user?.email)
            )

            const querySnapshot = await getDocs(q)

            querySnapshot.forEach(async (doC) => {
                if (doC.data()) {
                    const obj = { ...doC.data() }
                    if (
                        obj.stories &&
                        new Date() > obj.stories.expire.toDate()
                    ) {
                        delete obj.stories
                    }
                    obj.id = doC.id
                    SetProfileUser(obj)
                }
            })
        }
    }

    useEffect(() => {
        getProfile()
    }, [userContext])

    if (userContext?.user.user && profileUser?.avatar) {
        return (
            <SerachInputProvider>
                <SearchUserProvider>
                    <Router>
                        <Navbar />
                        <Routes>
                            <Route path="*" element={<NotFound />} />
                            {userContext?.user.user ? (
                                <Route
                                    path="/"
                                    element={
                                        <Suspense fallback={<Loading />}>
                                            <Home
                                                profileUser={profileUser}
                                                getProfile={getProfile}
                                            />
                                        </Suspense>
                                    }
                                />
                            ) : null}

                            {userContext?.user.user ? (
                                <Route
                                    path="/upload"
                                    element={
                                        <Upload profileUser={profileUser} />
                                    }
                                />
                            ) : null}
                            {userContext?.user.user ? (
                                <Route
                                    path="/chat"
                                    element={
                                        <Suspense fallback={<Loading />}>
                                            <Chat profileUser={profileUser} />
                                        </Suspense>
                                    }
                                />
                            ) : null}
                            {userContext?.user.user ? (
                                <Route
                                    path="/post/:id"
                                    element={
                                        <PostPreview
                                            profileUser={profileUser}
                                        />
                                    }
                                />
                            ) : null}
                            {userContext?.user.user ? (
                                <Route
                                    path="/profile"
                                    element={
                                        <Suspense fallback={<Loading />}>
                                            <Profile
                                                profileUser={profileUser}
                                                getProfile={getProfile}
                                            />
                                        </Suspense>
                                    }
                                />
                            ) : null}
                            {userContext?.user.user ? (
                                <Route
                                    path="/profile/:id"
                                    element={
                                        <Suspense fallback={<Loading />}>
                                            <ProfileForeign
                                                profileUser={profileUser}
                                            />
                                        </Suspense>
                                    }
                                />
                            ) : null}
                            {!userContext?.user.user ? (
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                            ) : null}
                            {!userContext?.user.user ? (
                                <Route path="/login" element={<Login />} />
                            ) : null}
                        </Routes>
                    </Router>
                </SearchUserProvider>
            </SerachInputProvider>
        )
    }

    if (userContext?.user.user && !profileUser?.avatar) {
        return <Loading />
    }

    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFound />} />

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
