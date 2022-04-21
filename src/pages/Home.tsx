import { ReactElement, useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { SearchResults } from '../components/SearchResults'
import { UserContext } from '../contexts/UserContext/UserContext'
import { SearchUserContext } from '../SearchedProfilesContext'

export function Home(): ReactElement | null {
    // const navigate = useNavigate()
    const user = useContext(UserContext)
    console.log(user)
    const searchUsers = useContext(SearchUserContext)

    // if (user?.user?.user?.email === undefined) {
    //     navigate('/login')
    //     console.log('????')
    // }

    // if (searchUsers?.searchedUser && searchUsers?.searchedUser?.length > 0) {
    //     alert(searchUsers?.searchedUser)
    // } else {
    //     alert('Empty')
    // }

    return (
        <div>
            <Navbar />
            Home
            {searchUsers?.searchedUser &&
                searchUsers?.searchedUser?.length > 0 && <SearchResults />}
        </div>
    )
}
