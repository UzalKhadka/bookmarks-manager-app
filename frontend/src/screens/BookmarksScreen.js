import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  deleteBookmark,
  deleteCategory,
  getCategoriesList,
  getCategoryDetails,
} from '../actions/userActions'

const BookmarksScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const CategoriesList = useSelector((state) => state.categoryList)
  const { categories } = CategoriesList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(getCategoriesList(userInfo._id))
  }, [dispatch, userInfo._id])

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

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const removeCategory = async (categoryId) => {
    dispatch(deleteCategory(userInfo._id, categoryId))
    await sleep(1000)
    dispatch(getCategoriesList(userInfo._id))
  }

  const editCategory = (categoryId) => {
    console.log('efit')

    history.push(`/categories/${categoryId}/edit-category`)
    sleep(100)
  }

  const editBookmark = (categoryId, bookmarkId) => {
    history.push(
      `/categories/${categoryId}/bookmarks/${bookmarkId}/edit-bookmark`
    )
  }

  const removeBookmark = async (categoryId, bookmarkId) => {
    dispatch(deleteBookmark(userInfo._id, categoryId, bookmarkId))
    await sleep(1000)
    dispatch(getCategoryDetails(userInfo._id, match.params.categoryID))
  }

  return (
    // <!-- my categories section -->
    <section id='my-bookmarks-and-categories'>
      <div className='my-categories-container'>
        <div className='my-categories-content'>
          <div className='my-categories-title'>
            <p className='title'>My Bookmarks & Categories</p>
          </div>
          <div className='my-bookmarks'>
            {categories.map((category, index) => (
              <div key={index} className='my-bookmarks-table'>
                <div className='table-title'>
                  <div className='table-title-name'>
                    <p className='current-category-name'>{category.name}</p>
                    <p className='current-category-privacy-type'>
                      ({category.isPrivate === true ? `Private` : `Public`})
                    </p>
                  </div>
                  <div className='table-title-icons'>
                    <span
                      id='editCategory'
                      onClick={() => editCategory(category._id)}
                    >
                      <i className='far fa-edit'></i>
                    </span>
                    <span
                      id='deleteCategory'
                      onClick={() => removeCategory(category._id)}
                    >
                      <i className='far fa-trash-alt'></i>
                    </span>
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
                        <th className='current-bookmark-edit current-bookmark-option'>
                          Edit
                        </th>
                        <th className='current-bookmark-delete current-bookmark-option'>
                          Delete
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {category.bookmarks.map((bookmark, index) => (
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
                          <td
                            id='currentBookmarkEdit'
                            className='current-bookmark-option'
                            onClick={() =>
                              editBookmark(category._id, bookmark._id)
                            }
                          >
                            <i className='far fa-edit'></i>
                          </td>
                          <td
                            id='currentBookmarkDelete'
                            className='current-bookmark-option'
                            onClick={() =>
                              removeBookmark(category._id, bookmark._id)
                            }
                          >
                            <i className='far fa-trash-alt'></i>
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

          <div className='category-card-container'>
            <div className='category-card'>
              <Link to='./add-category'>
                <div className='category-title'>
                  <div className='plus-container'>
                    <div className='plus-icon'></div>
                  </div>
                </div>
              </Link>
            </div>
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

export default BookmarksScreen
