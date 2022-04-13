import { ReactElement, useContext } from 'react'
import { Link } from 'react-router-dom'
import '../styles/pages/404.scss'
import { UserContext } from '../UserContext'

export function NotFound(): ReactElement | null {
    const user = useContext(UserContext)
    return (
        <>
            <header>
                <h4>404 not found</h4>
            </header>

            <main>
                <section className="section--image">
                    <img
                        src="https://vetri-suriya.web.app/devchallenges/404-not-found/Scarecrow.png"
                        alt=""
                    />
                </section>
                <section className="section--content">
                    <h5>I have bad news for you</h5>
                    <p>
                        The page you are looking for might be removed or is
                        temporarily unavailable
                    </p>
                    {user?.user?.user?.email ? (
                        <Link to="/">back to homepage</Link>
                    ) : (
                        <Link to="/login">back to Login Page</Link>
                    )}
                </section>
            </main>
        </>
    )
}
