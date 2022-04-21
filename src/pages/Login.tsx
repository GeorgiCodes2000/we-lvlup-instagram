/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ReactElement, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext/UserContext'
import { auth } from '../firebase.config.js'

export function Login(): ReactElement | null {
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const navigate = useNavigate()
    const userContext = useContext(UserContext)

    const login = async (
        loginEmailInp: string,
        loginPasswordInp: string
    ): Promise<void> => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmailInp,
                loginPasswordInp
            )
            userContext?.setUser(user)
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/')
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
            }
        }
    }

    return (
        <section className="py-4">
            <div className="container">
                <div className="row d-flex align-items-center justify-content-center">
                    <div style={{ maxWidth: '420px' }}>
                        <form
                            className="bg-white border py-4 px-5"
                            onSubmit={(e) => {
                                e.preventDefault()
                                login(loginEmail, loginPassword)
                            }}
                        >
                            <div className="text-center mb-3">
                                <p className="text-muted fw-bold">
                                    Log in to see photos and videos from your
                                    friends.
                                </p>
                            </div>
                            <div className="mb-3">
                                <a
                                    type="button"
                                    className="btn btn-primary d-block bg-gradient"
                                >
                                    <i className="fab fa-google" /> Log in with
                                    Google
                                </a>
                                <p className="my-3 text-center or">OR</p>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    name="email"
                                    placeholder="Mobile Number or Email"
                                    type="email"
                                    id="email"
                                    onChange={(e) =>
                                        setLoginEmail(e.target.value)
                                    }
                                />
                                <label htmlFor="email">
                                    Mobile Number or Email
                                </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    id="password"
                                    onChange={(e) =>
                                        setLoginPassword(e.target.value)
                                    }
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="mb-2">
                                <button
                                    className="btn btn-primary fw-bold w-100 bg-gradient"
                                    type="submit"
                                >
                                    Log in
                                </button>
                            </div>
                        </form>
                        <div className="bg-white py-4 px-5 text-center border mt-4">
                            <p className="m-0">
                                You do not have account yet ?{' '}
                                <Link to="/register">Register</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
