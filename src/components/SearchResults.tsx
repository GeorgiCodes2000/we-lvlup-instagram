import { ReactElement, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SearchUserContext } from '../contexts/SearchedProfileContext/SearchedProfilesContext'
import styles from './SearchResultsStyles.module.scss'

export function SearchResults(): ReactElement | null {
    const searchUsers = useContext(SearchUserContext)

    return (
        <div className={styles.searchContainer}>
            {searchUsers?.searchedUser?.map((el) => {
                return (
                    <Link
                        to={`/profile/${el.id}`}
                        className={styles.link}
                        key={el.id}
                    >
                        <div className={styles.resultDiv}>
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
