/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Navbar from '../components/Navbar'
import { UserContext } from '../contexts/UserContext/UserContext'
import { db, storage } from '../firebase.config.js'
import styles from '../styles/Upload.module.scss'

export default function Upload({
    getProfile,
    profileUser,
}: any): ReactElement | null {
    const userContext = useContext(UserContext)
    const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const [image, setImage] = useState<File>()
    const [preview, setPreview] = useState<string | null>()
    const [description, setDescription] = useState('')

    const uploadToDb = (file: File): void => {
        const storageRef = ref(
            storage,
            `/${userContext?.user.user.uid}/${file.name + uuidv4()}`
        )
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on('state_changed', () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                const posts = profileUser?.posts
                posts.push({
                    id: uuidv4(),
                    img: url,
                    description,
                })
                ;(async () => {
                    await updateDoc(doc(db, 'users', String(profileUser?.id)), {
                        posts,
                    })
                    getProfile()
                })()
            })
        })
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
        <>
            <Navbar />
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
                        accept="images/*"
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
                            className="form-control"
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
                        className="btn btn-dark"
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
                {/* {preview && preview?.length > 2 ? (
                <img
                    src={preview}
                    alt="nothing"
                    style={{ objectFit: 'cover' }}
                />
            ) : null} */}
            </div>
        </>
    )
}
