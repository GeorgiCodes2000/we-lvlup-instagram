import {
    collection,
    CollectionReference,
    doc,
    getDocs,
    query,
    updateDoc,
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

export { getPosts }
export { removeItemAll }
export { updateLikes }
