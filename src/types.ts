import { Timestamp } from 'firebase/firestore'

export type Stories = {
    img: string
    expire: Timestamp
    createdAt: Timestamp
}

export type Post = {
    comments: []
    createdAt: Timestamp
    description: string
    img: string
    likes: []
    uploader: string
}
