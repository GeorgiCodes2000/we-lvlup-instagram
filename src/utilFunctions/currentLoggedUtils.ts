import {
    collection,
    CollectionReference,
    getDocs,
    query,
    where,
} from 'firebase/firestore'
import { db } from '../firebase.config.js'
import { PostQueryType } from '../PostQueryType.js'

async function getPosts(id: string | undefined): Promise<PostQueryType[]> {
    const arr: Array<PostQueryType> = []
    const usersRef = collection(
        db,
        'posts'
    ) as CollectionReference<PostQueryType>
    const q = await query(usersRef, where('uploader', '==', id))

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doC) => {
        if (doC.data()) {
            const obj = { ...doC.data() }
            obj.id = doC.id
            console.log(obj)
            arr.push(obj)
        }
    })
    return arr
}

export { getPosts }
