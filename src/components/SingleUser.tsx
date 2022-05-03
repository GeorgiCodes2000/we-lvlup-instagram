import { ReactElement, useEffect, useState } from 'react'
import { UserQueryType } from '../UserQueryType'
import { getPosts } from '../utilFunctions/currentLoggedUtils'
import { SinglePost } from './SinglePost'

export function SingleUser({
    user,
    profileUser,
}: {
    user: UserQueryType
    profileUser: UserQueryType
}): ReactElement | null {
    const [posts, setPosts] = useState<any>()

    useEffect(() => {
        const arr = getPosts(user.id)
        arr.then((arr1) => {
            setPosts(arr1)
        })
    }, [])
    return (
        <div>
            {posts &&
                posts.map((el: any) => {
                    return (
                        <SinglePost
                            post={el}
                            user={user}
                            key={el.id}
                            profileUser={profileUser}
                        />
                    )
                })}
        </div>
    )
}
