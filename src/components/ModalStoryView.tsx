/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { ReactElement, useEffect, useRef } from 'react'
import { UserQueryType } from '../UserQueryType'

export function ModalStoryView({
    setOpenStoryModal,
    user,
}: {
    setOpenStoryModal: React.Dispatch<React.SetStateAction<boolean>>
    user: UserQueryType
}): ReactElement | null {
    const btnRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (btnRef.current) {
            btnRef.current.click()
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
                            {user.stories && user.stories.img.length > 0 ? (
                                <img
                                    className="story-preview"
                                    src={user.stories.img}
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
