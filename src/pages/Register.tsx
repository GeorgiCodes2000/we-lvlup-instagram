/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { ReactElement, useContext, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { auth, db } from '../firebase.config.js'
import { UserContext } from '../contexts/UserContext/UserContext'

export function Register(): ReactElement | null {
    const navigate = useNavigate()
    const user = useContext(UserContext)

    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [disabled, setDisabled] = useState(false)

    const notify = (message: string): any => {
        console.log(message)
        switch (message) {
            case 'Password':
                toast.error('Password should be at least 6 characters')
                break
            default:
                toast.error('Email already in use !')
                break
        }
    }

    async function registerUser(
        registerEmailInp: string,
        registerPasswordInp: string,
        usernameInp: string,
        fullNameInp: string
    ): Promise<void> {
        const users = collection(db, 'users')
        try {
            setDisabled(true)
            await createUserWithEmailAndPassword(
                auth,
                registerEmailInp,
                registerPasswordInp
            ).then((res) => {
                localStorage.setItem('user', JSON.stringify(res))
                setDisabled(false)
                user?.setUser(res)
                async function saveUser(): Promise<void> {
                    await addDoc(users, {
                        registerEmail,
                        usernameInp,
                        fullNameInp,
                        followers: [],
                        following: [],
                        posts: [],
                        avatar: 'data:image/jpeg;base64,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',
                        aboutInfo: '',
                    })
                }
                saveUser()
                navigate('/')
            })
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.indexOf('Password') > -1) {
                    notify('Password')
                } else {
                    notify('no')
                }

                setDisabled(false)
                console.log(error)
            }
        }
    }

    return (
        <>
            <ToastContainer position="top-center" />
            <section className="py-4">
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div style={{ maxWidth: '420px' }}>
                            <form
                                className="bg-white border py-4 px-5"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    registerUser(
                                        registerEmail,
                                        registerPassword,
                                        username,
                                        fullName
                                    )
                                }}
                            >
                                <div className="text-center mb-3">
                                    <p className="text-muted fw-bold">
                                        Sign up to see photos and videos from
                                        your friends.
                                    </p>
                                </div>
                                <div className="mb-3">
                                    <button
                                        type="button"
                                        className="btn btn-primary d-block bg-gradient w-100"
                                    >
                                        <i className="fab fa-google" /> Log in
                                        with Google
                                    </button>
                                    <p className="my-3 text-center or">OR</p>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        name="email"
                                        placeholder="Mobile Number or Email"
                                        type="email"
                                        required
                                        onChange={(e) =>
                                            setRegisterEmail(e.target.value)
                                        }
                                    />
                                    <label>Mobile Number or Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        name="fullname"
                                        placeholder="Full Name"
                                        type="text"
                                        required
                                        onChange={(e) =>
                                            setFullName(e.target.value)
                                        }
                                    />
                                    <label>Full Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        name="username"
                                        placeholder="Username"
                                        type="text"
                                        required
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                    <label>Username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        required
                                        onChange={(e) =>
                                            setRegisterPassword(e.target.value)
                                        }
                                    />
                                    <label>Password</label>
                                </div>
                                <div className="mb-2">
                                    <button
                                        className="btn btn-primary fw-bold w-100 bg-gradient"
                                        type="submit"
                                        disabled={disabled}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                                <div className="small text-center">
                                    By signing up, you agree to our Terms , Data
                                    Policy and Cookies Policy.
                                </div>
                            </form>
                            <div className="bg-white py-4 px-5 text-center border mt-4">
                                <p className="m-0">
                                    Have an account?{' '}
                                    <Link to="/login">Log in</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
