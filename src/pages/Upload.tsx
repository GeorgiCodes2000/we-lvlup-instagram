/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { UserContext } from '../contexts/UserContext/UserContext'
import { db, storage } from '../firebase.config.js'
import styles from '../styles/Upload.module.scss'

export default function Upload({ profileUser }: any): ReactElement | null {
    const userContext = useContext(UserContext)
    const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const [image, setImage] = useState<File>()
    const [preview, setPreview] = useState<string | null>()
    const [description, setDescription] = useState('')
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate()

    const uploadToDb = (file: File): void => {
        const storageRef = ref(
            storage,
            `/${userContext?.user.user.uid}/${file.name + uuidv4()}`
        )
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            'state_changed',
            () => {
                setDisabled(true)
            },
            null,
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    const posts = collection(db, 'posts')
                    async function savePost(): Promise<void> {
                        await addDoc(posts, {
                            img: url,
                            uploader: profileUser?.id,
                            description,
                            likes: [],
                            comments: [],
                            createdAt: serverTimestamp(),
                        })
                    }
                    savePost()
                    setDisabled(true)
                    navigate('/profile')
                })
            }
        )
    }

    useEffect(() => {
        if (image !== undefined) {
            const reader = new FileReader()
            reader.onload = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(image)
        } else {
            setPreview(null)
        }
    }, [image])

    return (
        <div className={styles.uploadContainer}>
            <div className={styles.imgUploadContainer}>
                {preview ? (
                    <img
                        src={preview}
                        style={{ objectFit: 'cover' }}
                        alt="nothing"
                        onClick={() => {
                            setImage(undefined)
                        }}
                    />
                ) : (
                    <button
                        type="button"
                        onClick={(event) => {
                            event.preventDefault()
                            fileInputRef.current.click()
                            console.log('??')
                        }}
                        className="btn btn-outline-dark"
                        data-mdb-ripple-color="dark"
                        style={{ zIndex: 1 }}
                    >
                        Upload image
                    </button>
                )}
            </div>
            <form>
                <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={(event) => {
                        if (event.target.files) {
                            const file = event.target.files[0]
                            setImage(file)
                        }
                    }}
                />

                <div className="input-group mb-3 pt-4">
                    <div className="input-group-prepend">
                        <span
                            className="input-group-text"
                            id="inputGroup-sizing-default"
                        >
                            Description
                        </span>
                    </div>
                    <input
                        type="text"
                        className="form-control w-50"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={description}
                        onChange={(event) => {
                            setDescription(event.target.value)
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-dark w-25 m-auto"
                    disabled={disabled}
                    onClick={(event) => {
                        event.preventDefault()
                        if (image) {
                            uploadToDb(image)
                        }
                    }}
                >
                    Post
                </button>
            </form>
        </div>
    )
}
