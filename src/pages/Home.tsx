import { ReactElement, useContext } from 'react'
import Navbar from '../components/Navbar'
import { UserContext } from '../UserContext'

export function Home(): ReactElement | null {
    const user = useContext(UserContext)

    console.log(user || null)

    return (
        <div>
            <Navbar />
        </div>
    )
}
