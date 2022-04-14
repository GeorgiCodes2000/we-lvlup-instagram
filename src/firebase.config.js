import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyBEwubuHkc0e7UjwTMBVg-URHH2ivV6aq0',
    authDomain: 'instagram-clone-3b071.firebaseapp.com',
    projectId: 'instagram-clone-3b071',
    storageBucket: 'instagram-clone-3b071.appspot.com',
    messagingSenderId: '100394239880',
    appId: '1:100394239880:web:7f66ff0b109514806d5c3d',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage()
