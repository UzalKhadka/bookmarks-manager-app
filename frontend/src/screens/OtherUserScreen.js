import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserCategoriesList } from '../actions/userActions'

const OtherUserScreen = ({ match }) => {
  const dispatch = useDispatch()

  const UserCategoriesList = useSelector((state) => state.userCategoryList)
  const { loading, error, user } = UserCategoriesList

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
      <div class='my-categories-container'>
        <div class='my-categories-content'>
          <div class='my-categories-title'>
            <p class='title'>{`Bookmarks & Categories of ${userName}`}</p>
          </div>
          <div class='my-bookmarks'>
            {user.categories &&
              user.categories.map((category, index) => (
                <div key={index} class='my-bookmarks-table'>
                  <div class='table-title'>
                    <div class='table-title-name'>
                      <p class='current-category-name'>{category.name}</p>
                      <p class='current-category-privacy-type'>
                        ({category.isPrivate === true ? `Private` : `Public`})
                      </p>
                    </div>
                  </div>
                  <div class='table-body'>
                    <table class='bookmark-table'>
                      <thead>
                        <tr>
                          <th class='current-bookmark-sn current-bookmark-option'>
                            S.N
                          </th>
                          <th class='current-bookmark-name'>Name</th>
                          <th class='current-bookmark-link'>Link</th>
                          <th class='current-bookmark-copy current-bookmark-option'>
                            Copy
                          </th>
                          <th class='current-bookmark-goto current-bookmark-option'>
                            Go To
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {category.bookmarks &&
                          category.bookmarks.map((bookmark, index) => (
                            <tr>
                              <td class='current-bookmark-sn current-bookmark-option'>
                                {index + 1}
                              </td>
                              <td class='current-bookmark-name'>
                                {bookmark.name}
                              </td>
                              <td class='current-bookmark-link'>
                                {bookmark.link}
                              </td>
                              <td
                                id='currentBookmarkCopy'
                                class='current-bookmark-option'
                                onClick={() => copyToClipboard(bookmark.link)}
                              >
                                <i class='far fa-copy'></i>
                              </td>
                              <td
                                id='currentBookmarkGoTo'
                                class='current-bookmark-option'
                                onClick={() => openInNewTab(bookmark.link)}
                              >
                                <i class='fas fa-external-link-alt'></i>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div class='add-bookmark-button'>
                    <Link to={`/categories/${category._id}/add-bookmark/`}>
                      <div class='button last'>Add A Bookmark</div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>

          <div class='go-back-button'>
            <Link to='/'>
              <div class='button last'>Go Back</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OtherUserScreen
