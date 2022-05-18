import {
    collection,
    CollectionReference,
    doc,
    getDocs,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where,
} from 'firebase/firestore'
import { db } from '../firebase.config.js'
import { PostQueryType } from '../PostQueryType.js'
import { StoryQueryType } from '../StoryQueryType.js'

async function getPosts(id: string | undefined): Promise<PostQueryType[]> {
    const arr: Array<PostQueryType> = []
    const usersRef = (await collection(
        db,
        'posts'
    )) as CollectionReference<PostQueryType>
    const q = await query(
        usersRef,
        where('uploader', '==', id),
        orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doC) => {
        if (doC.data()) {
            const obj = { ...doC.data() }
            obj.id = doC.id

            arr.push(obj)
        }
    })
    return arr
}

async function getStories(id: string | undefined): Promise<StoryQueryType[]> {
    const tsToMillis = Timestamp.now().toMillis()
    const compareDate = new Date(tsToMillis - 24 * 60 * 60 * 1000)

    const arr: Array<StoryQueryType> = []
    const usersRef = (await collection(
        db,
        'stories'
    )) as CollectionReference<StoryQueryType>
    const q = await query(
        usersRef,
        where('uploader', '==', id),
        where('createdAt', '>', compareDate)
    )

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doC) => {
        if (doC.data()) {
            const obj = { ...doC.data() }
            obj.id = doC.id

            arr.push(obj)
        }
    })
    return arr
}

function removeItemAll(arr: any[], value: any): any {
    let i = 0
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1)
        } else {
            i += 1
        }
    }
    return arr
}

async function updateLikes(id: string, likes: any): Promise<void> {
    await updateDoc(doc(db, 'posts', String(id)), {
        likes,
    })
}

async function updateComments(id: string, comments: any): Promise<void> {
    await updateDoc(doc(db, 'posts', String(id)), {
        comments,
    })
}

export { getPosts }
export { removeItemAll }
export { updateLikes }
export { updateComments }
export { getStories }
