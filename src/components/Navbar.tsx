import { ReactElement } from 'react'
import '../styles/pages/navbar.scss'
import { Link } from 'react-router-dom'

function Navbar(): ReactElement | null {
    return (
        <div className="navigation">
            <div className="logo">
                <Link className="no-underline" to="/">
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
            </div>
        </div>
    )
}

export default Navbar
