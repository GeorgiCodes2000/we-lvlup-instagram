/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-await-in-loop */
import { ReactElement, useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import {
    collection,
    DocumentData,
    onSnapshot,
    query,
    QuerySnapshot,
    where,
} from 'firebase/firestore'
import { SearchResults } from '../components/SearchResults'
import { SearchUserContext } from '../contexts/SearchedProfileContext/SearchedProfilesContext'
import { UserQueryType } from '../UserQueryType'
import { db } from '../firebase.config.js'
import { Loading } from '../components/Loading'
import { SingleUser } from '../components/SingleUser'
import { Stories } from '../components/Stories'

// import { SearchInputContext } from '../contexts/SearchInputContext/SearchInputContext'

function Home({
    profileUser,
    getProfile,
}: {
    profileUser: UserQueryType
    getProfile: any
}): ReactElement | null {
    const searchUsers = useContext(SearchUserContext)
    const [followingUsers, setFollowingUsers] = useState<UserQueryType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    // const input = useContext(SearchInputContext)

    // async function getFollowingUsers(): Promise<void> {
    //     const arr = [...followingUsers]
    //     for (let i = 0; i < profileUser?.following.length; i += 1) {
    //         try {
    //             const docRef = await doc(db, 'users', profileUser.following[i])
    //             const fetchedDoc = await getDoc(docRef)
    //             const obj = { ...fetchedDoc.data() }
    //             if (obj.stories && new Date() > obj.stories.expire.toDate()) {
    //                 await updateDoc(docRef, {
    //                     stories: deleteField(),
    //                 })
    //                 delete obj.stories
    //             }
    //             obj.id = fetchedDoc.id
    //             arr.push(obj)
    //             if (i === profileUser?.following.length - 1) {
    //                 setIsLoading(false)
    //             }
    //         } catch (e) {
    //             console.log('Error getting cached document:', e)
    //         }
    //     }

    //     setFollowingUsers(arr)
    // }

    useEffect(() => {
        getProfile()

        const users = query(
            collection(db, 'users'),
            where('followers', 'array-contains-any', [profileUser.id])
        )

        const unsubscribe = onSnapshot(
            users,
            (querySnapshot: QuerySnapshot<DocumentData>) => {
                const allUsers: UserQueryType[] = []
                querySnapshot.forEach((docUser) => {
                    allUsers.push({
                        ...(docUser.data() as UserQueryType),
                        id: docUser.id,
                    })
                })

                if (isLoading) setIsLoading(false)
                setFollowingUsers(allUsers)
            }
        )
        return () => unsubscribe()
    }, [])

    // useEffect(() => {
    //     const now = Timestamp.now()
    //     const users = query(
    //         collection(db, 'users'),
    //         where('followers', 'array-contains-any', [profileUser.id]),
    //         where('expire', '<', now)
    //     )

    //     const unsubscribe = onSnapshot(
    //         users,
    //         (querySnapshot: QuerySnapshot<DocumentData>) => {
    //             const allUsers: any = []
    //             querySnapshot.forEach((docUser) => {
    //                 allUsers.push({ ...docUser.data(), id: docUser.id })
    //             })

    //             if (isLoading) setIsLoading(false)
    //             setFollowingUsers(allUsers)
    //         }
    //     )
    //     console.log(isLoading)

    //     return () => unsubscribe()
    // }, [profileUser])

    if (searchUsers?.searchedUser && searchUsers?.searchedUser?.length > 0) {
        return <SearchResults />
    }

    if (followingUsers.length > 0) {
        console.log(followingUsers)
        console.log(isLoading)
        return (
            <div>
                <Stories
                    followingUsers={followingUsers}
                    profileUser={profileUser}
                    getProfile={getProfile}
                />
                {isLoading ? (
                    <Loading />
                ) : (
                    followingUsers.map((el: UserQueryType) => (
                        <SingleUser
                            user={el}
                            key={el.id}
                            profileUser={profileUser}
                        />
                    ))
                )}
            </div>
        )
    }

    return null
}

export default Home
