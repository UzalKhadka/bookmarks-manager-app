import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserCategoriesList } from '../actions/userActions'

const OtherUserScreen = ({ match }) => {
  const dispatch = useDispatch()

  const UserCategoriesList = useSelector((state) => state.userCategoryList)
  const { user } = UserCategoriesList

  const userName = user ? user.name : 'User'

  useEffect(() => {
    dispatch(getUserCategoriesList(match.params.username))
  }, [dispatch, match.params.username])

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link)
  }

  const openInNewTab = (link) => {
    const newWindow = window.open(
      'https://' + link,
      '_blank',
      'noopener,noreferrer'
    )
    if (newWindow) newWindow.opener = null
  }

  return (
    // <!-- my categories section -->
    <section id='my-bookmarks-and-categories'>
      <div className='my-categories-container'>
        <div className='my-categories-content'>
          <div className='my-categories-title'>
            <p className='title'>{`Bookmarks & Categories of ${userName}`}</p>
          </div>
          <div className='my-bookmarks'>
            {user.categories &&
              user.categories.map((category, index) => (
                <div key={index} className='my-bookmarks-table'>
                  <div className='table-title'>
                    <div className='table-title-name'>
                      <p className='current-category-name'>{category.name}</p>
                      <p className='current-category-privacy-type'>
                        ({category.isPrivate === true ? `Private` : `Public`})
                      </p>
                    </div>
                  </div>
                  <div className='table-body'>
                    <table className='bookmark-table'>
                      <thead>
                        <tr>
                          <th className='current-bookmark-sn current-bookmark-option'>
                            S.N
                          </th>
                          <th className='current-bookmark-name'>Name</th>
                          <th className='current-bookmark-link'>Link</th>
                          <th className='current-bookmark-copy current-bookmark-option'>
                            Copy
                          </th>
                          <th className='current-bookmark-goto current-bookmark-option'>
                            Go To
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {category.bookmarks &&
                          category.bookmarks.map((bookmark, index) => (
                            <tr>
                              <td className='current-bookmark-sn current-bookmark-option'>
                                {index + 1}
                              </td>
                              <td className='current-bookmark-name'>
                                {bookmark.name}
                              </td>
                              <td className='current-bookmark-link'>
                                {bookmark.link}
                              </td>
                              <td
                                id='currentBookmarkCopy'
                                className='current-bookmark-option'
                                onClick={() => copyToClipboard(bookmark.link)}
                              >
                                <i className='far fa-copy'></i>
                              </td>
                              <td
                                id='currentBookmarkGoTo'
                                className='current-bookmark-option'
                                onClick={() => openInNewTab(bookmark.link)}
                              >
                                <i className='fas fa-external-link-alt'></i>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className='add-bookmark-button'>
                    <Link to={`/categories/${category._id}/add-bookmark/`}>
                      <div className='button last'>Add A Bookmark</div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>

          <div className='go-back-button'>
            <Link to='/'>
              <div className='button last'>Go Back</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OtherUserScreen
