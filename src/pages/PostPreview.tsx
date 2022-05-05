/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { doc, getDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ReactElement, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { db } from '../firebase.config.js'
import '../styles/pages/PostPreview.scss'
import { UserQueryType } from '../UserQueryType'
import {
    removeItemAll,
    updateComments,
    updateLikes,
} from '../utilFunctions/currentLoggedUtils'

export function PostPreview({
    profileUser,
}: {
    profileUser: UserQueryType | undefined
}): ReactElement | null {
    const { id } = useParams()
    const [post, setPost] = useState<any>()
    const [postOwner, setPostOwner] = useState<any>()
    const [inpValue, setInpValue] = useState('')

    async function getPost(): Promise<void> {
        const docRef = doc(db, 'posts', String(id))
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const obj = { ...docSnap.data() }
            obj.id = docSnap.id
            setPost(obj)
            const docRef1 = doc(db, 'users', String(obj.uploader))
            const docSnap1 = await getDoc(docRef1)
            if (docSnap1.exists()) {
                const obj1 = { ...docSnap1.data() }
                obj1.id = docSnap1.id
                setPostOwner(obj1)
            } else {
                console.log('error')
            }
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
        }
    }

    async function like(): Promise<void> {
        if (post?.likes.includes(profileUser?.id)) {
            const arr = removeItemAll(post?.likes, profileUser?.id)
            const newPost = { ...post }
            newPost.likes = arr
            setPost(newPost)
            await updateLikes(post?.id, arr)
        } else {
            const arr = post?.likes
            arr.push(profileUser?.id)
            const newPost = { ...post }
            newPost.likes = arr
            setPost(newPost)
            await updateLikes(post?.id, arr)
        }
    }

    function handleInput(event: React.FormEvent<HTMLInputElement>): void {
        setInpValue(event.currentTarget.value)
    }

    const notify = (): any =>
        toast.error('Comments should be atleast 2 symbols!')

    async function comment(): Promise<void> {
        const arr = post?.comments
        if (inpValue.length > 1) {
            const commentObj = {
                id: uuidv4(),
                comment: inpValue,
                commentatorId: profileUser?.id,
                commentatorImg: profileUser?.avatar,
                commentatorName: profileUser?.fullNameInp,
            }
            arr.push(commentObj)
            const newPost = { ...post }
            newPost.comments = arr
            setPost(newPost)
            await updateComments(post?.id, arr)
            setInpValue('')
        } else {
            notify()
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <>
            <Navbar />
            <ToastContainer position="top-center" />

            <div className="container mt-5 mb-5">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="d-flex justify-content-between p-2 px-3">
                                <div className="d-flex flex-row align-items-center">
                                    {' '}
                                    <Link to={`/profile/${postOwner?.id}`}>
                                        <img
                                            src={postOwner?.avatar}
                                            width="50"
                                            className="rounded-circle"
                                            alt="1"
                                        />
                                    </Link>
                                    <div className="d-flex flex-column ms-2">
                                        {' '}
                                        <span className="font-weight-bold">
                                            {postOwner?.fullNameInp}
                                        </span>{' '}
                                    </div>
                                </div>
                            </div>{' '}
                            <img
                                src={post?.img}
                                className="img-fluid"
                                alt="1"
                            />
                            <div className="p-2">
                                <p className="text-justify">
                                    {post?.description}
                                </p>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex flex-row icons d-flex align-items-center">
                                        {' '}
                                        {post?.likes.includes(
                                            profileUser?.id
                                        ) ? (
                                            <>
                                                <i
                                                    className="fa fa-heart"
                                                    onClick={like}
                                                />
                                                <span>
                                                    {post?.likes.length}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <i
                                                    className="fa fa-heart-o"
                                                    onClick={like}
                                                />
                                                <span>
                                                    {post?.likes.length}
                                                </span>
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
                                <div className="comments">
                                    {post?.comments.map((el: any) => {
                                        return (
                                            <div
                                                className="d-flex flex-row mb-2"
                                                key={el.id}
                                            >
                                                {' '}
                                                <Link
                                                    to={`/profile/${el.commentatorId}`}
                                                    key={el.id}
                                                >
                                                    <img
                                                        src={el?.commentatorImg}
                                                        width="40"
                                                        className="rounded-image"
                                                        alt="1"
                                                    />
                                                </Link>
                                                <div className="d-flex flex-column ms-2">
                                                    {' '}
                                                    <span className="name">
                                                        {el?.commentatorName}
                                                    </span>{' '}
                                                    <small className="comment-text">
                                                        {el?.comment}
                                                    </small>
                                                    {/* <div className="d-flex flex-row align-items-center status">
                                                        {' '}
                                                        <small>Like</small>{' '}
                                                        <small>Reply</small>{' '}
                                                        <small>Translate</small>{' '}
                                                        <small>18 mins</small>{' '}
                                                    </div> */}
                                                </div>
                                            </div>
                                        )
                                    })}

                                    <div className="comment-input">
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Post comment"
                                                aria-label="Example text with button addon"
                                                aria-describedby="button-addon1"
                                                value={inpValue}
                                                onChange={(event) =>
                                                    handleInput(event)
                                                }
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="submit"
                                                id="button-addon1"
                                                onClick={comment}
                                            >
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
