/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable dot-notation */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { SearchInputContext } from '../contexts/SearchInputContext/SearchInputContext'
import { db } from '../firebase.config.js'
import { SearchUserContext } from '../contexts/SearchedProfileContext/SearchedProfilesContext'
import style from '../styles/pages/Profile.module.scss'
import { getPosts } from '../utilFunctions/currentLoggedUtils'
import { PostQueryType } from '../PostQueryType'
import { ModalInfo } from '../components/ModalInfo'

function ProfileForeign({
    profileUser,
}: {
    profileUser: any
}): ReactElement | null {
    // const [profileUser, SetProfileUser] = useState<UserQueryType | undefined>()
    const { id } = useParams()
    const [user, setUser] = useState<any>()
    const [followBtn, setFollowBtn] = useState(false)
    const searchUsers = useContext(SearchUserContext)
    const input = useContext(SearchInputContext)
    const [posts, setPosts] = useState<PostQueryType[]>([])
    const [isModalFollowers, setIsModalFollowers] = useState(false)
    const [isModalFollowing, setIsModalFollowing] = useState(false)

    function removeItemOnce(arr: any, value: string): any {
        const index = arr.indexOf(value)
        if (index > -1) {
            arr.splice(index, 1)
        }
        return arr
    }
    const navigate = useNavigate()

    function initialFollowState(obj: any): void {
        if (
            obj &&
            obj.followers &&
            obj.followers.includes(String(profileUser.id))
        ) {
            setFollowBtn(true)
        } else {
            setFollowBtn(false)
        }
    }

    async function getProfile(): Promise<void> {
        const docRef = doc(db, 'users', String(id))
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data())
            const obj = { ...docSnap.data() }
            obj.id = docSnap.id
            setUser(obj)
            initialFollowState(obj)
            const arr = getPosts(obj.id)
            arr.then((arr1) => setPosts(arr1))
            if (profileUser?.id === obj?.id) {
                navigate('/profile')
            }
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
        }
    }

    async function follow(): Promise<void> {
        const { followers } = user
        const { following } = profileUser
        if (user.followers.includes(profileUser.id)) {
            const arr = removeItemOnce(followers, String(profileUser.id))
            const arr1 = removeItemOnce(following, String(user?.id))
            await updateDoc(doc(db, 'users', String(user?.id)), {
                followers: arr,
            })
            await updateDoc(doc(db, 'users', String(profileUser.id)), {
                following: arr1,
            })
            getProfile()
        } else {
            followers.push(String(profileUser.id))
            following.push(String(user?.id))
            await updateDoc(doc(db, 'users', String(user?.id)), {
                followers,
            })
            await updateDoc(doc(db, 'users', String(profileUser.id)), {
                following,
            })
            getProfile()
        }
    }

    useEffect(() => {
        searchUsers?.setSearchedUser([])
        input?.setInput('')
        getProfile()
    }, [])

    return (
        <>
            {isModalFollowers && (
                <ModalInfo
                    setIsModal={setIsModalFollowers}
                    list={user.followers}
                />
            )}
            {isModalFollowing && (
                <ModalInfo
                    setIsModal={setIsModalFollowing}
                    list={user.following}
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
                                        style={{ width: '150px' }}
                                    >
                                        {user && user.avatar.length > 0 && (
                                            <img
                                                src={user.avatar}
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
                                            onClick={follow}
                                        >
                                            {followBtn ? 'Unfollow' : 'Follow'}
                                        </button>
                                    </div>
                                    <div
                                        className="ms-3"
                                        style={{ marginTop: '130px' }}
                                    >
                                        <h5>{user?.fullNameInp}</h5>
                                    </div>
                                </div>
                                <div
                                    className="p-4 text-black"
                                    style={{ backgroundColor: '#f8f9fa' }}
                                >
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <div>
                                            <p className="mb-1 h5">
                                                {posts.length}
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
                                                {user?.followers.length}
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
                                                {user?.following?.length}
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

                                        <div
                                            className="p-4"
                                            style={{
                                                backgroundColor: '#f8f9fa',
                                            }}
                                        >
                                            <div className="form-outline" />
                                            <p className="font-italic mb-1">
                                                {user?.aboutInfo}
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

                                    <div className={style.container}>
                                        {posts?.map((el) => {
                                            return (
                                                <Link
                                                    to={`/post/${el['id']}`}
                                                    key={el.id}
                                                >
                                                    <div className={style.item}>
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

export default ProfileForeign
