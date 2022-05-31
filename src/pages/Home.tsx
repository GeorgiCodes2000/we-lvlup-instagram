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

    if (searchUsers?.searchedUser && searchUsers?.searchedUser?.length > 0) {
        return <SearchResults />
    }

    if (followingUsers.length > 0) {
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

    if (followingUsers.length === 0 && isLoading === false) {
        return (
            <h1 className="text-center mt-3">You are not following anybody.</h1>
        )
    }

    return null
}

export default Home
