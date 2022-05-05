/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../contexts/UserContext/UserContext'
import { db, storage } from '../firebase.config.js'
import styles from './uploadStyles.module.scss'

export default function UploadAvatar({
    getProfile,
    profileUser,
}: any): ReactElement | null {
    const userContext = useContext(UserContext)
    const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const [image, setImage] = useState<File>()
    const [preview, setPreview] = useState<string | null>()

    const uploadToDb = (file: File): void => {
        const storageRef = ref(
            storage,
            `/${userContext?.user.user.uid}/${file.name}`
        )
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on('state_changed', null, null, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                ;(async () => {
                    await updateDoc(doc(db, 'users', String(profileUser?.id)), {
                        avatar: url,
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
        <div className={styles.container}>
            <form className={styles.form}>
                {preview ? (
                    <img
                        className={styles.uploadImg}
                        src={preview}
                        style={{ objectFit: 'cover' }}
                        alt="nothing"
                        onClick={() => {
                            setImage(undefined)
                        }}
                    />
                ) : (
                    <button
                        className={styles.uploadBtn}
                        type="button"
                        onClick={(event) => {
                            event.preventDefault()
                            fileInputRef.current.click()
                            console.log('??')
                        }}
                    >
                        Change profile
                    </button>
                )}
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
                <button
                    type="submit"
                    className="btn btn-primary"
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
    )
}
