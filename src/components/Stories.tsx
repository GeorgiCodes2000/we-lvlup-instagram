/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Timestamp } from 'firebase/firestore'
import { memo, ReactElement, useEffect, useState } from 'react'
import { UserQueryType } from '../UserQueryType'
import { ModalStoryPreview } from './ModalStoryPreview'
import { ModalStoryView } from './ModalStoryView'

function Stories1({
    followingUsers,
    profileUser,

    getProfile,
}: {
    followingUsers: UserQueryType[]
    profileUser: UserQueryType

    getProfile: any
}): ReactElement | null {
    const [image, setImage] = useState<File>()
    const [preview, setPreview] = useState<string | null>()
    const [openStoryModal, setOpenStoryModal] = useState(false)
    const [openStoryModalId, setOpenStoryModalId] = useState('')

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
        <div className="container mt-5">
            {preview ? (
                <ModalStoryPreview
                    preview={preview}
                    setPreview={setPreview}
                    profileUser={profileUser}
                    image={image}
                    getProfile={getProfile}
                />
            ) : null}

            <div className="carousel m-0 d-flex justify-content-center align-items-center">
                <div
                    className="d-flex flex-column justify-content-center align-items-center mx-2"
                    id="storyOfLogged"
                >
                    <img
                        src={profileUser.avatar}
                        className="circular--square"
                        alt={profileUser.fullNameInp}
                        onClick={() => {
                            setOpenStoryModal(true)
                            setOpenStoryModalId(profileUser.id)
                        }}
                    />
                    <button type="button" id="buttonForStory">
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            id="storyInput"
                            onChange={(event) => {
                                if (event.target.files) {
                                    const file = event.target.files[0]
                                    setImage(file)
                                }
                            }}
                        />
                        <label htmlFor="storyInput" id="buttonForStory">
                            <i className="fas fa-plus" />
                        </label>
                    </button>

                    {openStoryModal &&
                    profileUser.id === openStoryModalId &&
                    profileUser.stories ? (
                        <ModalStoryView
                            setOpenStoryModal={setOpenStoryModal}
                            user={profileUser}
                        />
                    ) : null}

                    <small>You</small>
                </div>
                {followingUsers.map((el: UserQueryType) => {
                    if (el.stories && el.stories.expire > Timestamp.now()) {
                        return (
                            <div className="d-flex flex-column justify-content-center align-items-center mx-2">
                                <img
                                    src={el.avatar}
                                    className="circular--square"
                                    alt={el.fullNameInp}
                                    onClick={() => {
                                        setOpenStoryModal(true)
                                        setOpenStoryModalId(el.id)
                                    }}
                                />
                                {openStoryModal &&
                                el.id === openStoryModalId ? (
                                    <ModalStoryView
                                        setOpenStoryModal={setOpenStoryModal}
                                        user={el}
                                    />
                                ) : null}
                                <small>{el.fullNameInp}</small>
                            </div>
                        )
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export const Stories = memo(Stories1)
