/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { query, collection, where, getDocs } from 'firebase/firestore'
import { ReactElement, useEffect, useState } from 'react'
import { ChatHead } from '../components/ChatHead'
import { db } from '../firebase.config.js'
import '../styles/pages/chat.scss'
import { UserQueryType } from '../UserQueryType'

export function Chat({
    profileUser,
}: {
    profileUser: UserQueryType
}): ReactElement | null {
    const [chatUsers, setChatUsers] = useState<UserQueryType[]>([])
    const [friendUser, setFriendUser] = useState<UserQueryType>()

    async function getFollowingUsers(): Promise<void> {
        const arr: UserQueryType[] = []
        const users = query(
            collection(db, 'users'),
            where('followers', 'array-contains-any', [profileUser.id])
        )
        console.log(users)
        const querySnapshot = await getDocs(users)
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            const obj = { ...doc.data() }
            obj.id = doc.id
            arr.push(obj as UserQueryType)
        })
        setChatUsers(arr)
    }

    useEffect(() => {
        getFollowingUsers()
    }, [])

    return (
        <main className="content d-flex justify-content-center">
            <div className="container p-0">
                <h1 className="h3 mb-3">Messages</h1>

                <div className="card">
                    <div className="row g-0">
                        <div className="col-12 col-lg-5 col-xl-3 border-right">
                            {chatUsers.map((el: UserQueryType) => {
                                return (
                                    <div
                                        className="list-group-item list-group-item-action border-0"
                                        onClick={() => {
                                            setFriendUser(el)
                                        }}
                                    >
                                        <div className="d-flex align-items-start">
                                            <img
                                                src={el.avatar}
                                                className="rounded-circle mr-1"
                                                alt="Vanessa Tucker"
                                                width="40"
                                                height="40"
                                            />
                                            <div className="flex-grow-1 ml-3">
                                                {el.fullNameInp}
                                                <div className="small">
                                                    <span className="fas fa-circle chat-online" />{' '}
                                                    Online
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            <hr className="d-block d-lg-none mt-1 mb-0" />
                        </div>

                        <ChatHead
                            profileUser={profileUser}
                            friendUser={friendUser}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
