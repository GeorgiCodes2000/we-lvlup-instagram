import { ReactElement, useContext } from 'react'
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
        console.log(text?.length)
        const end = text?.replace(/.$/, (c: string) =>
            String.fromCharCode(c.charCodeAt(0) + 1)
        )
        console.log('tuka inputa')
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
            console.log(input?.input.length)
            searchUsers?.setSearchedUser(arr)
            navigate('/')
        }
        if (input?.input && input.input.length <= 1) {
            searchUsers?.setSearchedUser([])
        }
    }

    const signUserOut = (): void => {
        signOut(auth)
            .then(() => {
                user?.setUser({})
                localStorage.clear()
                navigate('/login')
            })
            .catch(Error)
    }

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

                        getProfile()
                    }}
                />
                <div className="search-container">
                    <div className="search-container-box">
                        <div className="search-results" />
                    </div>
                </div>
            </div>
            <div className="navigation-icons">
                <Link to="/" target="_blank" className="navigation-link">
                    <i className="far fa-compass" />
                </Link>
                <Link to="/" className="navigation-link notifica">
                    <i className="far fa-heart" />
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
