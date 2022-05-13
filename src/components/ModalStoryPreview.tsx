/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { doc, updateDoc } from 'firebase/firestore'
import { UserContext } from '../contexts/UserContext/UserContext'
import { db, storage } from '../firebase.config.js'
import { UserQueryType } from '../UserQueryType'

export function ModalStoryPreview({
    preview,
    setPreview,
    profileUser,
    image,
    getProfile,
}: {
    preview: string
    setPreview: React.Dispatch<React.SetStateAction<string | null | undefined>>
    profileUser: UserQueryType
    image: File | undefined

    getProfile: any
}): ReactElement | null {
    const btnRef = useRef<HTMLButtonElement>(null)
    const userContext = useContext(UserContext)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        if (btnRef.current) {
            btnRef.current.click()
        }
    }, [])

    const uploadToDb = (): void => {
        if (image) {
            const storageRef = ref(
                storage,
                `/${userContext?.user.user.uid}/${image.name + uuidv4()}`
            )
            const uploadTask = uploadBytesResumable(storageRef, image)
            console.log(uploadTask)
            uploadTask.on(
                'state_changed',
                () => {
                    setDisabled(true)
                },
                null,
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        ;(async () => {
                            const date = new Date()
                            const tommorow = new Date()
                            tommorow.setDate(date.getDate() + 1)
                            const story = {
                                img: url,
                                createdAt: date,
                                expire: tommorow,
                            }

                            await updateDoc(
                                doc(db, 'users', String(profileUser?.id)),
                                {
                                    stories: story,
                                }
                            )
                            getProfile()
                            setDisabled(false)
                        })()
                    })
                }
            )
        }
    }

    return (
        <>
            <button
                ref={btnRef}
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ visibility: 'hidden' }}
            />
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setPreview(null)}
                            />
                        </div>
                        <div className="modal-body">
                            <img
                                className="story-preview"
                                src={preview}
                                alt="ava"
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => setPreview(null)}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={disabled}
                                onClick={uploadToDb}
                            >
                                Upload story
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
