/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { ReactElement, useEffect, useRef, useState } from 'react'
import { getStories } from '../utilFunctions/currentLoggedUtils'

export function ModalStoryView({
    setOpenStoryModal,
    user,
}: {
    setOpenStoryModal: React.Dispatch<React.SetStateAction<boolean>>
    user: any
}): ReactElement | null {
    const btnRef = useRef<HTMLButtonElement>(null)

    const [stories, setStories] = useState<any>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (btnRef.current) {
            btnRef.current.click()

            const arr = getStories(user.id)
            arr.then((arr1) => {
                setStories(arr1)
                setLoading(false)
            })
        }
    }, [])

    return (
        <>
            <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ visibility: 'hidden' }}
                ref={btnRef}
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
                                onClick={() => setOpenStoryModal(false)}
                            />
                        </div>
                        <div className="modal-body">
                            {' '}
                            {stories && stories.length > 0 && !loading ? (
                                <img
                                    className="story-preview"
                                    src={stories[0].img}
                                    alt="losho"
                                />
                            ) : (
                                <div className="d-flex justify-content-center">
                                    <div
                                        className="spinner-grow text-center"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                </div>
                            )}{' '}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => setOpenStoryModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
