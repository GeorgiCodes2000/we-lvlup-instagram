import { doc, getDoc } from 'firebase/firestore'
import { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { db } from '../firebase.config.js'
import '../styles/pages/PostPreview.scss'

export function PostPreview(): ReactElement | null {
    const { id } = useParams()
    const [post, setPost] = useState<any>()

    async function getPost(): Promise<void> {
        const docRef = doc(db, 'posts', String(id))
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const obj = { ...docSnap.data() }
            obj.id = docSnap.id
            setPost(obj)
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    return (
        <>
            <Navbar />
            <div className="container mt-5 mb-5">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="d-flex justify-content-between p-2 px-3">
                                <div className="d-flex flex-row align-items-center">
                                    {' '}
                                    <img
                                        src={post?.img}
                                        width="50"
                                        className="rounded-circle"
                                        alt="1"
                                    />
                                    <div className="d-flex flex-column ml-2">
                                        {' '}
                                        <span className="font-weight-bold">
                                            Jeanette Sun
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
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt.
                                </p>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex flex-row icons d-flex align-items-center">
                                        {' '}
                                        <i className="fa fa-heart" />{' '}
                                        <i className="fa fa-smile-o ml-2" />{' '}
                                    </div>
                                    <div className="d-flex flex-row muted-color">
                                        {' '}
                                        <span>2 comments</span>{' '}
                                        <span className="ml-2">Share</span>{' '}
                                    </div>
                                </div>
                                <hr />
                                <div className="comments">
                                    <div className="d-flex flex-row mb-2">
                                        {' '}
                                        <img
                                            src={post?.img}
                                            width="40"
                                            className="rounded-image"
                                            alt="1"
                                        />
                                        <div className="d-flex flex-column ml-2">
                                            {' '}
                                            <span className="name">
                                                Daniel Frozer
                                            </span>{' '}
                                            <small className="comment-text">
                                                I like this alot! thanks alot
                                            </small>
                                            <div className="d-flex flex-row align-items-center status">
                                                {' '}
                                                <small>Like</small>{' '}
                                                <small>Reply</small>{' '}
                                                <small>Translate</small>{' '}
                                                <small>18 mins</small>{' '}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row mb-2">
                                        {' '}
                                        <img
                                            src="https://i.imgur.com/1YrCKa1.jpg"
                                            width="40"
                                            className="rounded-image"
                                            alt="1"
                                        />
                                        <div className="d-flex flex-column ml-2">
                                            {' '}
                                            <span className="name">
                                                Elizabeth goodmen
                                            </span>{' '}
                                            <small className="comment-text">
                                                Thanks for sharing!
                                            </small>
                                            <div className="d-flex flex-row align-items-center status">
                                                {' '}
                                                <small>Like</small>{' '}
                                                <small>Reply</small>{' '}
                                                <small>Translate</small>{' '}
                                                <small>8 mins</small>{' '}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment-input">
                                        {' '}
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                        <div className="fonts">
                                            {' '}
                                            <i className="fa fa-camera" />{' '}
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