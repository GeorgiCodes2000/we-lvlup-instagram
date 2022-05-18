/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-await-in-loop */
import { ReactElement, useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { deleteField, doc, getDoc, updateDoc } from 'firebase/firestore'
import Navbar from '../components/Navbar'
import { SearchResults } from '../components/SearchResults'
import { SearchUserContext } from '../contexts/SearchedProfileContext/SearchedProfilesContext'
import { UserQueryType } from '../UserQueryType'
import { db } from '../firebase.config.js'
import { Loading } from '../components/Loading'
import { SingleUser } from '../components/SingleUser'
import { Stories } from '../components/Stories'

// import { SearchInputContext } from '../contexts/SearchInputContext/SearchInputContext'

export function Home({
    profileUser,
    getProfile,
}: {
    profileUser: UserQueryType
    getProfile: any
}): ReactElement | null {
    const searchUsers = useContext(SearchUserContext)
    const [followingUsers, setFollowingUsers] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)
    // const input = useContext(SearchInputContext)

    async function getFollowingUsers(): Promise<void> {
        const arr = [...followingUsers]
        for (let i = 0; i < profileUser?.following.length; i += 1) {
            try {
                const docRef = await doc(db, 'users', profileUser.following[i])
                const fetchedDoc = await getDoc(docRef)
                const obj = { ...fetchedDoc.data() }
                if (obj.stories && new Date() > obj.stories.expire.toDate()) {
                    await updateDoc(docRef, {
                        stories: deleteField(),
                    })
                    delete obj.stories
                }
                obj.id = fetchedDoc.id
                arr.push(obj)
                if (i === profileUser?.following.length - 1) {
                    setIsLoading(false)
                }
            } catch (e) {
                console.log('Error getting cached document:', e)
            }
        }

        setFollowingUsers(arr)
    }

    useEffect(() => {
        // searchUsers?.setSearchedUser([])
        // input?.setInput('')\

        getFollowingUsers()
        const interval = setInterval(() => {
            getFollowingUsers()
            getProfile()
        }, 1000000)

        return () => clearInterval(interval)
    }, [])

    if (searchUsers?.searchedUser && searchUsers?.searchedUser?.length > 0) {
        return (
            <>
                <Navbar />
                <SearchResults />
            </>
        )
    }

    if (followingUsers.length > 0) {
        return (
            <div>
                <Navbar />
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

    return <Navbar />
}
