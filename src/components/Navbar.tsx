import { ReactElement, useContext, useEffect } from 'react'
import '../styles/pages/navbar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import {
    collection,
    CollectionReference,
    getDocs,
    query,
    where,
} from 'firebase/firestore'
import { auth, db } from '../firebase.config.js'
import { UserQueryType } from '../UserQueryType'
import { SearchUserContext } from '../contexts/SearchedProfileContext/SearchedProfilesContext'
import { UserContext } from '../contexts/UserContext/UserContext'
import { SearchInputContext } from '../contexts/SearchInputContext/SearchInputContext'

function Navbar(): ReactElement | null {
    const user = useContext(UserContext)
    const input = useContext(SearchInputContext)
    const searchUsers = useContext(SearchUserContext)
    const navigate = useNavigate()

    async function getProfile(): Promise<void> {
        const arr: UserQueryType[] = []
        const text = input?.input
        console.log(arr)
        console.log(text)
        const end = text?.replace(/.$/, (c: string) =>
            String.fromCharCode(c.charCodeAt(0) + 1)
        )
        const usersRef = collection(
            db,
            'users'
        ) as CollectionReference<UserQueryType>
        const q = await query(
            usersRef,
            where('fullNameInp', '>=', text),
            where('fullNameInp', '<', end)
        )

        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doC) => {
            if (doC.data()) {
                const obj = { ...doC.data() }
                obj.id = doC.id
                arr.push(obj)
            }
        })
        if (arr.length > 0) {
            searchUsers?.setSearchedUser(arr)
            navigate('/')
        } else {
            searchUsers?.setSearchedUser([])
        }
        if (input?.input && input.input.length === 0) {
            searchUsers?.setSearchedUser([])
        }
    }

    const signUserOut = (): void => {
        signOut(auth)
            .then(() => {
                window.localStorage.removeItem('user')
                user?.setUser({})
                navigate('/login')
                navigate(0)
            })
            .catch(Error)
    }

    useEffect(() => {
        getProfile()
    }, [input?.input])

    return (
        <div className="navigation">
            <div className="logo">
                <Link className="no-underline" to="/">
                    {/* {user?.user.user?.email} */}
                    Instagram
                </Link>
            </div>
            <div className="navigation-search-container">
                <i className="fa fa-search" />
                <input
                    className="search-field"
                    type="text"
                    placeholder="Search"
                    value={input?.input}
                    onChange={(event) => {
                        input?.setInput(event.target.value)
                    }}
                />
                <div className="search-container">
                    <div className="search-container-box">
                        <div className="search-results" />
                    </div>
                </div>
            </div>
            <div className="navigation-icons">
                <Link to="/upload" className="navigation-link">
                    <i className="fas fa-plus" />
                </Link>

                <Link to="/profile" className="navigation-link">
                    <i className="far fa-user-circle" />
                </Link>
                <Link to="/" className="navigation-link" onClick={signUserOut}>
                    <i className="fas fa-sign-out-alt" />
                </Link>
            </div>
        </div>
    )
}

export default Navbar
