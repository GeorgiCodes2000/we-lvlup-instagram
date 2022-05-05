/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-await-in-loop */
import { ReactElement, useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import Navbar from '../components/Navbar'
import { SearchResults } from '../components/SearchResults'
import { UserContext } from '../contexts/UserContext/UserContext'
import { SearchUserContext } from '../contexts/SearchedProfileContext/SearchedProfilesContext'
import { UserQueryType } from '../UserQueryType'
import { db } from '../firebase.config.js'
import { Loading } from '../components/Loading'
import { SingleUser } from '../components/SingleUser'
// import { SearchInputContext } from '../contexts/SearchInputContext/SearchInputContext'

export function Home({
    profileUser,
}: {
    profileUser: UserQueryType
}): ReactElement | null {
    const user = useContext(UserContext)
    console.log(user)
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
        // input?.setInput('')
        getFollowingUsers()
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
