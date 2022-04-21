/* eslint-disable jsx-a11y/label-has-associated-control */
import { ReactElement, useContext, useEffect, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config.js'
import { UserQueryType } from '../UserQueryType.js'
import Navbar from '../components/Navbar'
import { SearchUserContext } from '../SearchedProfilesContext'
import { SearchInputContext } from '../contexts/SearchInputContext/SearchInputContext'
import UploadAvatar from '../components/UploadAvatar'

export function Profile({
    profileUser,
    getProfile,
}: {
    profileUser: UserQueryType | undefined
    getProfile: any
}): ReactElement | null {
    // const [profileUser, SetProfileUser] = useState<UserQueryType | undefined>()
    const [edit, setEdit] = useState(false)
    const [bioText, setBioText] = useState<string | undefined>(
        profileUser?.aboutInfo
    )
    const searchUsers = useContext(SearchUserContext)
    const input = useContext(SearchInputContext)

    useEffect(() => {
        searchUsers?.setSearchedUser([])
        input?.setInput('')
    }, [])

    return (
        <>
            <Navbar />
            <section className="h-100 gradient-custom-2">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-9 col-xl-7">
                            <div className="card">
                                <div
                                    className="rounded-top text-white d-flex flex-row"
                                    style={{
                                        backgroundColor: '#000',
                                        height: '200px',
                                    }}
                                >
                                    <div
                                        className="ms-4 mt-5 d-flex flex-column"
                                        style={{ width: '150px' }}
                                    >
                                        {profileUser &&
                                            profileUser.avatar.length > 0 && (
                                                <img
                                                    src={profileUser.avatar}
                                                    alt="Generic placeholder"
                                                    className="img-fluid img-thumbnail mt-4 mb-2"
                                                    style={{
                                                        width: '150px',
                                                        zIndex: 1,
                                                    }}
                                                />
                                            )}

                                        <button
                                            type="button"
                                            className="btn btn-outline-dark"
                                            data-mdb-ripple-color="dark"
                                            style={{ zIndex: 1 }}
                                            onClick={() => setEdit(!edit)}
                                        >
                                            Edit profile
                                        </button>
                                    </div>
                                    <div
                                        className="ms-3"
                                        style={{ marginTop: '130px' }}
                                    >
                                        <h5>{profileUser?.fullNameInp}</h5>
                                    </div>
                                </div>
                                <div
                                    className="p-4 text-black"
                                    style={{ backgroundColor: '#f8f9fa' }}
                                >
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <div>
                                            <p className="mb-1 h5">253</p>
                                            <p className="small text-muted mb-0">
                                                Photos
                                            </p>
                                        </div>
                                        <div className="px-3">
                                            <p className="mb-1 h5">
                                                {profileUser?.followers.length}
                                            </p>
                                            <p className="small text-muted mb-0">
                                                Followers
                                            </p>
                                        </div>
                                        <div>
                                            <p className="mb-1 h5">
                                                {profileUser?.following?.length}
                                            </p>
                                            <p className="small text-muted mb-0">
                                                Following
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body p-4 text-black">
                                    <div className="mb-5">
                                        <p className="lead fw-normal mb-1">
                                            About
                                        </p>
                                        {edit && (
                                            <UploadAvatar
                                                getProfile={getProfile}
                                                profileUser={profileUser}
                                            />
                                        )}
                                        <div
                                            className="p-4"
                                            style={{
                                                backgroundColor: '#f8f9fa',
                                            }}
                                        >
                                            <div className="form-outline">
                                                {edit && (
                                                    <div className="input-group mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder=""
                                                            aria-label="Example text with button addon"
                                                            aria-describedby="button-addon1"
                                                            value={bioText}
                                                            onChange={(
                                                                e: React.FormEvent<HTMLInputElement>
                                                            ) => {
                                                                setBioText(
                                                                    e
                                                                        .currentTarget
                                                                        .value
                                                                )
                                                            }}
                                                        />
                                                        <button
                                                            className="btn btn-outline-primary"
                                                            type="button"
                                                            id="button-addon1"
                                                            data-mdb-ripple-color="dark"
                                                            onClick={async () => {
                                                                await updateDoc(
                                                                    doc(
                                                                        db,
                                                                        'users',
                                                                        String(
                                                                            profileUser?.id
                                                                        )
                                                                    ),
                                                                    {
                                                                        aboutInfo:
                                                                            bioText,
                                                                    }
                                                                )
                                                                getProfile()
                                                                setEdit(false)
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="font-italic mb-1">
                                                {profileUser?.aboutInfo}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0">
                                            Recent photos
                                        </p>
                                        <p className="mb-0">
                                            <a href="#!" className="text-muted">
                                                Show all
                                            </a>
                                        </p>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col mb-2">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                                alt=" 1"
                                                className="w-100 rounded-3"
                                            />
                                        </div>
                                        <div className="col mb-2">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                                alt=" 1"
                                                className="w-100 rounded-3"
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                                alt=" 1"
                                                className="w-100 rounded-3"
                                            />
                                        </div>
                                        <div className="col">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                                alt=" 1"
                                                className="w-100 rounded-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
