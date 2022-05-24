/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable dot-notation */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ReactElement, useContext, useEffect, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { db } from '../firebase.config.js'
import { UserQueryType } from '../UserQueryType.js'
import { SearchUserContext } from '../contexts/SearchedProfileContext/SearchedProfilesContext'
import { SearchInputContext } from '../contexts/SearchInputContext/SearchInputContext'
import UploadAvatar from '../components/UploadAvatar'
import style from '../styles/pages/Profile.module.scss'
import { getPosts } from '../utilFunctions/currentLoggedUtils'
import { PostQueryType } from '../PostQueryType.js'
import { Loading } from '../components/Loading'
import { ModalInfo } from '../components/ModalInfo'

function Profile({
    profileUser,
    getProfile,
}: {
    profileUser: UserQueryType | undefined
    getProfile: any
}): ReactElement | null {
    // const [profileUser, SetProfileUser] = useState<UserQueryType | undefined>()
    const [edit, setEdit] = useState(false)
    const [posts, setPosts] = useState<PostQueryType[] | undefined>()
    const [bioText, setBioText] = useState<string | undefined>()
    const [isModalFollowers, setIsModalFollowers] = useState(false)
    const [isModalFollowing, setIsModalFollowing] = useState(false)
    const searchUsers = useContext(SearchUserContext)
    const input = useContext(SearchInputContext)

    useEffect(() => {
        if (profileUser && profileUser?.id) {
            setBioText(profileUser?.aboutInfo)
            const arr = getPosts(profileUser?.id)
            arr.then((arr1) => {
                setPosts(arr1)
            })
        }
        searchUsers?.setSearchedUser([])
        input?.setInput('')
    }, [])

    const editBio = async (): Promise<void> => {
        await updateDoc(doc(db, 'users', String(profileUser?.id)), {
            aboutInfo: bioText,
        })
        getProfile()
        setEdit(false)
    }

    if (profileUser) {
        return (
            <>
                {isModalFollowers && (
                    <ModalInfo
                        setIsModal={setIsModalFollowers}
                        list={profileUser.followers}
                    />
                )}
                {isModalFollowing && (
                    <ModalInfo
                        setIsModal={setIsModalFollowing}
                        list={profileUser.following}
                    />
                )}
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
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                            }}
                                        >
                                            {profileUser &&
                                                profileUser.avatar.length >
                                                    0 && (
                                                    <img
                                                        src={profileUser.avatar}
                                                        alt="Generic placeholder"
                                                        className="img-fluid img-thumbnail mt-4 mb-2"
                                                        style={{
                                                            width: '150px',
                                                            height: '150px',
                                                            minWidth: '100%',
                                                            minHeight: '100%',
                                                            maxWidth: '100%',
                                                            maxHeight: '100%',
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
                                                <p className="mb-1 h5">
                                                    {posts?.length}
                                                </p>
                                                <p className="small text-muted mb-0">
                                                    Photos
                                                </p>
                                            </div>
                                            <div className="px-3">
                                                <p
                                                    className="mb-1 h5 followInfo"
                                                    onClick={() =>
                                                        setIsModalFollowers(
                                                            !isModalFollowers
                                                        )
                                                    }
                                                >
                                                    {
                                                        profileUser?.followers
                                                            .length
                                                    }
                                                </p>
                                                <p className="small text-muted mb-0">
                                                    Followers
                                                </p>
                                            </div>
                                            <div>
                                                <p
                                                    className="mb-1 h5 followInfo"
                                                    onClick={() =>
                                                        setIsModalFollowing(
                                                            !isModalFollowing
                                                        )
                                                    }
                                                >
                                                    {
                                                        profileUser?.following
                                                            ?.length
                                                    }
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
                                                                onClick={
                                                                    editBio
                                                                }
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
                                                Photos
                                            </p>
                                        </div>

                                        <div className={style.container}>
                                            {posts?.map((el) => {
                                                return (
                                                    <Link
                                                        to={`/post/${el['id']}`}
                                                        key={el.id}
                                                    >
                                                        <div
                                                            className={
                                                                style.item
                                                            }
                                                        >
                                                            <img
                                                                src={el['img']}
                                                                alt=" 1"
                                                                className={
                                                                    style.itemImage
                                                                }
                                                            />
                                                        </div>
                                                    </Link>
                                                )
                                            })}
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
    return <Loading />
}

export default Profile
