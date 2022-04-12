import { ReactElement, useContext } from 'react'
import { UserContext } from '../App'
import Navbar from '../components/Navbar'

export function Home(): ReactElement | null {
    const user = useContext(UserContext)
    console.log(user || null)
    return (
        <div>
            <Navbar />
        </div>
    )
}
