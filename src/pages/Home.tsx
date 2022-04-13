import { ReactElement, useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { UserContext } from '../UserContext'

export function Home(): ReactElement | null {
    // const navigate = useNavigate()
    const user = useContext(UserContext)
    console.log(user)

    // if (user?.user?.user?.email === undefined) {
    //     navigate('/login')
    //     console.log('????')
    // }

    return (
        <div>
            <Navbar />
            Home
        </div>
    )
}
