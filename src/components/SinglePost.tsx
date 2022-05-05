/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ReactElement, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserQueryType } from '../UserQueryType'
import { removeItemAll, updateLikes } from '../utilFunctions/currentLoggedUtils'

export function SinglePost({
    post,
    user,
    profileUser,
}: {
    post: any
    user: UserQueryType
    profileUser: UserQueryType
}): ReactElement | null {
    const [postLocal, setPostLocal] = useState(post)

    async function like(): Promise<void> {
        if (post?.likes.includes(profileUser?.id)) {
            const arr = removeItemAll(post?.likes, profileUser?.id)
            const newPost = { ...post }
            newPost.likes = arr
            setPostLocal(newPost)
            await updateLikes(post?.id, arr)
        } else {
            const arr = post?.likes
            arr.push(profileUser?.id)
            const newPost = { ...post }
            newPost.likes = arr
            setPostLocal(newPost)
            await updateLikes(post?.id, arr)
        }
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="d-flex justify-content-between p-2 px-3">
                            <div className="d-flex flex-row align-items-center">
                                {' '}
                                <Link to={`/profile/${user?.id}`}>
                                    <img
                                        src={user?.avatar}
                                        width="50"
                                        className="rounded-circle"
                                        alt="1"
                                    />
                                </Link>
                                <div className="d-flex flex-column ms-2">
                                    {' '}
                                    <span className="font-weight-bold">
                                        {user?.fullNameInp}
                                    </span>{' '}
                                </div>
                            </div>
                        </div>{' '}
                        <Link
                            to={`/post/${postLocal.id}`}
                            className="text-center"
                        >
                            <img
                                src={post?.img}
                                className="img-fluid"
                                alt="1"
                            />
                        </Link>
                        <div className="p-2">
                            <p className="text-justify">{post?.description}</p>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex flex-row icons d-flex align-items-center">
                                    {' '}
                                    {post?.likes.includes(profileUser?.id) ? (
                                        <>
                                            <i
                                                className="fa fa-heart"
                                                onClick={like}
                                            />
                                            <span>{post?.likes.length}</span>
                                        </>
                                    ) : (
                                        <>
                                            <i
                                                className="fa fa-heart-o"
                                                onClick={like}
                                            />
                                            <span>{post?.likes.length}</span>
                                        </>
                                    )}
                                    <i className="fa fa-smile-o ml-2" />{' '}
                                </div>
                                <div className="d-flex flex-row muted-color">
                                    {' '}
                                    <span>
                                        {post?.comments.length} comments
                                    </span>{' '}
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
