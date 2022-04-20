import { ReactElement, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SearchUserContext } from '../SearchedProfilesContext'
import styles from './SearchResultsStyles.module.scss'

export function SearchResults(): ReactElement | null {
    const searchUsers = useContext(SearchUserContext)

    return (
        <div className={styles.searchContainer}>
            {searchUsers?.searchedUser?.map((el) => {
                return (
                    <Link to={`/profile/${el.id}`} className={styles.link}>
                        <div className={styles.resultDiv} key={el.id}>
                            <img
                                className="rounded-circle z-depth-2 img-fluid"
                                alt="100x100"
                                src={el.avatar}
                                data-holder-rendered="true"
                            />
                            <p>{el.fullNameInp}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
