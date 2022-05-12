import { FieldValue } from 'firebase/firestore'

export type StoryQueryType = {
    id: string
    img: string
    createdAt: FieldValue
    uploader: string
}
