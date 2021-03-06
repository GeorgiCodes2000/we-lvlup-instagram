import { Stories } from './types'

export type UserQueryType = {
    id: string
    followers: []
    fullNameInp: string
    registerEmail: string
    usernameInp: string
    following: []
    avatar: string
    aboutInfo: string
    posts?: []
    stories?: Stories
}
