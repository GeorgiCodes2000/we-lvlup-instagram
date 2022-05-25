/* eslint-disable consistent-return */
import {
    addDoc,
    collection,
    DocumentData,
    onSnapshot,
    orderBy,
    query,
    QuerySnapshot,
    Timestamp,
    where,
} from 'firebase/firestore'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { db } from '../firebase.config.js'
import { UserQueryType } from '../UserQueryType'

export function ChatHead({
    profileUser,
    friendUser,
}: {
    profileUser: UserQueryType
    friendUser: UserQueryType | undefined
}): ReactElement | null {
    const [message, setMessage] = useState('')
    // const [messageSent, setMessagesSent] = useState<any>([])
    // const [messageRecieved, setMessagesRecieved] = useState<any>([])
    const [allMessages, setAllMessages] = useState<any>([])
    const scrollRef = useRef<HTMLDivElement>(null)

    async function sendMessage(): Promise<void> {
        const obj = {
            createdAt: Timestamp.now(),
            sender: profileUser.id,
            reciever: friendUser?.id,
            message,
            participants: `${profileUser.id},${friendUser?.id}`,
        }
        const messages = collection(db, 'messages')

        await addDoc(messages, obj)
        setMessage('')
        scrollRef.current?.scrollIntoView()
    }

    useEffect(() => {
        if (friendUser?.id && profileUser.id) {
            const messagesIsent = query(
                collection(db, 'messages'),
                where('participants', 'in', [
                    `${profileUser.id},${friendUser?.id}`,
                    `${friendUser?.id},${profileUser.id}`,
                ]),

                orderBy('createdAt', 'asc')
            )

            const unsubscribeSent = onSnapshot(
                messagesIsent,
                (querySnapshot: QuerySnapshot<DocumentData>) => {
                    const arrTotal: any = []
                    querySnapshot.forEach((docUser) => {
                        console.log(docUser.data())
                        arrTotal.push({
                            ...docUser.data(),
                            id: docUser.id,
                        })
                    })

                    setAllMessages([...arrTotal])
                }
            )

            return () => {
                unsubscribeSent()
            }
        }
    }, [friendUser])

    if (friendUser) {
        return (
            <div className="col-12 col-lg-7 col-xl-9">
                <div className="py-2 px-4 border-bottom d-none d-lg-block">
                    <div className="d-flex align-items-center py-1">
                        <div className="position-relative">
                            <img
                                src={friendUser.avatar}
                                className="rounded-circle mr-1"
                                alt="Sharon Lessman"
                                width="40"
                                height="40"
                            />
                        </div>
                        <div className="flex-grow-1 pl-3 ms-2">
                            <strong>{friendUser.fullNameInp}</strong>
                        </div>
                    </div>
                </div>

                <div className="position-relative">
                    <div className="chat-messages p-4">
                        {allMessages.length > 0
                            ? allMessages.map((el: any) => {
                                  if (el.sender === profileUser.id) {
                                      return (
                                          <>
                                              <div
                                                  className="chat-message-right pb-4"
                                                  key={el.id}
                                              >
                                                  <div>
                                                      <img
                                                          src={
                                                              profileUser.avatar
                                                          }
                                                          className="rounded-circle mr-1"
                                                          alt="Chris Wood"
                                                          width="40"
                                                          height="40"
                                                      />
                                                  </div>
                                                  <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                                      {el.message}
                                                  </div>
                                              </div>
                                              <div ref={scrollRef} />
                                          </>
                                      )
                                  }
                                  if (el.sender === friendUser.id) {
                                      return (
                                          <div
                                              className="chat-message-left pb-4"
                                              key={el.id}
                                          >
                                              <div>
                                                  <img
                                                      src={friendUser.avatar}
                                                      className="rounded-circle mr-1"
                                                      alt="Sharon Lessman"
                                                      width="40"
                                                      height="40"
                                                  />
                                              </div>
                                              <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                                  <div className="font-weight-bold mb-1">
                                                      {friendUser.fullNameInp}
                                                  </div>
                                                  {el.message}
                                              </div>
                                          </div>
                                      )
                                  }
                                  return null
                              })
                            : null}
                    </div>
                </div>

                <div className="flex-grow-0 py-3 px-4 border-top">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type your message"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />

                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return null
}
