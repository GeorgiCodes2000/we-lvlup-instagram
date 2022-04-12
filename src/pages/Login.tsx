/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export function Login(): ReactElement | null {
    return (
        <section className="py-4">
            <div className="container">
                <div className="row d-flex align-items-center justify-content-center">
                    <div style={{ maxWidth: '420px' }}>
                        <form
                            className="bg-white border py-4 px-5"
                            onSubmit={(e) => {
                                e.preventDefault()
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
                                    <i className="fab fa-facebook" /> Log in
                                    with facebook
                                </a>
                                <p className="my-3 text-center or">OR</p>
                            </div>
                            <div className="form-floating mb-3">
                                <label htmlFor="email">
                                    Mobile Number or Email
                                </label>

                                <input
                                    className="form-control"
                                    name="email"
                                    placeholder="Mobile Number or Email"
                                    type="email"
                                    id="email"
                                />
                            </div>
                            <div className="form-floating mb-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    id="password"
                                />
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
