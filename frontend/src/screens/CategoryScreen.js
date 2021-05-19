import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getCategoryDetails,
  deleteBookmark,
  deleteCategory,
  getCategoriesList,
} from '../actions/userActions'

const CategoryScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { category } = categoryDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(getCategoryDetails(userInfo._id, match.params.categoryID))
  }, [dispatch, match.params.categoryID, userInfo._id])

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
    history.push('/categories')
    await sleep(1000)
    dispatch(getCategoriesList(userInfo._id))
  }

  const editCategory = (categoryId) => {
    history.push(`/categories/${categoryId}/edit-category`)
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
            <p className='title'>{category.name}</p>
          </div>
          <ul className='my-bookmarks'>
            <li className='my-bookmarks-table'>
              <div className='table-title'>
                <div className='table-title-name'>
                  <p className='current-category-name'>{category.name}</p>
                  <p className='current-category-privacy-type'>
                    {category.isPrivate === true ? `(Private)` : `(Public)`}
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
                      <th className='current-bookmark-sn current-bookmark-index'>
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
                    {category.bookmarks &&
                      category.bookmarks.map((bookmark, index) => (
                        <tr key={index}>
                          <td className='current-bookmark-sn current-bookmark-index'>
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
            </li>
            <div className='add-bookmark-button'>
              <Link to={`/categories/${category._id}/add-bookmark/`}>
                <div className='button last'>Add A Bookmark</div>
              </Link>
            </div>
          </ul>

          <div className='go-back-button'>
            <Link to='/categories'>
              <div className='button last'>Go Back</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryScreen
