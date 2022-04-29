/* eslint-disable no-unused-vars */
import { ReactElement } from 'react'

export function ModalInfo({
    followers,
}: {
    followers: any
}): ReactElement | null {
    console.log(followers)
    return (
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Modal title
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">...</div>
                    <div className="modal-footer" />
                </div>
            </div>
        </div>
    )
}
