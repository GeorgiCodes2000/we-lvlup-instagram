/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-await-in-loop */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { doc, getDoc } from 'firebase/firestore'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { db } from '../firebase.config.js'

export function ModalInfo({
    setIsModal,
    list,
}: {
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
    list: any
}): ReactElement | null {
    const btnRef = useRef<HTMLButtonElement>(null)
    const [infoList, setInfoList] = useState<any>([])

    async function getInfoUsers(): Promise<void> {
        const arr = [...infoList]
        if (list.length > 0) {
            for (let i = 0; i < list.length; i += 1) {
                try {
                    const docRef = await doc(db, 'users', list[i])
                    const fetchedDoc = await getDoc(docRef)
                    const obj = { ...fetchedDoc.data() }
                    obj.id = fetchedDoc.id
                    arr.push(obj)
                    if (i === list.length - 1) {
                        setInfoList(false)
                    }
                } catch (e) {
                    console.log('Error getting cached document:', e)
                }
            }

            setInfoList(arr)
        }
    }

    useEffect(() => {
        if (btnRef.current) {
            getInfoUsers()
            btnRef.current.click()
        }
    }, [])

    return (
        <div>
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
                            <h5
                                className="modal-title"
                                id="staticBackdropLabel"
                            >
                                Modal title
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setIsModal((prev) => !prev)}
                            />
                        </div>
                        <div className="modal-body">
                            {infoList.length > 0 &&
                                infoList?.map((el: any) => {
                                    return (
                                        <div className="d-flex w-100 d-flex justify-content-between align-items-center">
                                            <div
                                                className="d-flex justify-content-between align-items-center"
                                                id="modalImgDiv"
                                            >
                                                <img
                                                    alt="100x100"
                                                    src={el.avatar}
                                                    data-holder-rendered="true"
                                                    id="imgModal"
                                                />
                                            </div>
                                            <p className="w-50 text-center">
                                                {el.fullNameInp}
                                            </p>
                                        </div>
                                    )
                                })}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => setIsModal((prev) => !prev)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
