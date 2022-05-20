import { ReactElement, useEffect, useState } from 'react'
import { PostQueryType } from '../PostQueryType'
import { UserQueryType } from '../UserQueryType'
import { getPosts } from '../utilFunctions/currentLoggedUtils'
import { Loading } from './Loading'
import { SinglePost } from './SinglePost'

export function SingleUser({
    user,
    profileUser,
}: {
    user: UserQueryType
    profileUser: UserQueryType
}): ReactElement | null {
    const [posts, setPosts] = useState<PostQueryType[]>()
    const [isLoading, setIsLoadin] = useState(true)

    useEffect(() => {
        console.log(user)
        const arr = getPosts(user.id)
        arr.then((arr1) => {
            setPosts(arr1)
            setIsLoadin(false)
        })
    }, [])
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                posts &&
                posts.map((el: PostQueryType) => {
                    return (
                        <SinglePost
                            post={el}
                            user={user}
                            key={el.id}
                            profileUser={profileUser}
                        />
                    )
                })
            )}
        </div>
    )
}
