import { ReactElement, useContext } from 'react'
import '../styles/pages/navbar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase.config.js'
import { UserContext } from '../UserContext'

function Navbar(): ReactElement | null {
    const user = useContext(UserContext)

    const navigate = useNavigate()
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
                <Link to="/" className="navigation-link">
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
