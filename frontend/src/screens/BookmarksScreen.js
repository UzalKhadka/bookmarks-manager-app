import axios from 'axios'
import React, { useState } from 'react'
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
  const { loading, error, categories } = CategoriesList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(getCategoriesList(userInfo._id))
  }, [dispatch, userInfo._id])

  const copyToClipboard = (link) => {
    // console.log(link)
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
    // dispatch(getCategoryDetails(userInfo._id, match.params.categoryID))
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
      <div class='my-categories-container'>
        <div class='my-categories-content'>
          <div class='my-categories-title'>
            <p class='title'>My Bookmarks & Categories</p>
          </div>
          <div class='my-bookmarks'>
            {categories.map((category, index) => (
              <div key={index} class='my-bookmarks-table'>
                <div class='table-title'>
                  <div class='table-title-name'>
                    <p class='current-category-name'>{category.name}</p>
                    <p class='current-category-privacy-type'>
                      ({category.isPrivate === true ? `Private` : `Public`})
                    </p>
                  </div>
                  <div class='table-title-icons'>
                    <span
                      id='editCategory'
                      onClick={() => editCategory(category._id)}
                    >
                      <i class='far fa-edit'></i>
                    </span>
                    <span
                      id='deleteCategory'
                      onClick={() => removeCategory(category._id)}
                    >
                      <i class='far fa-trash-alt'></i>
                    </span>
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
                        <th class='current-bookmark-edit current-bookmark-option'>
                          Edit
                        </th>
                        <th class='current-bookmark-delete current-bookmark-option'>
                          Delete
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {category.bookmarks.map((bookmark, index) => (
                        <tr>
                          <td class='current-bookmark-sn current-bookmark-option'>
                            {index + 1}
                          </td>
                          <td class='current-bookmark-name'>{bookmark.name}</td>
                          <td class='current-bookmark-link'>{bookmark.link}</td>
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
                          <td
                            id='currentBookmarkEdit'
                            class='current-bookmark-option'
                            onClick={() =>
                              editBookmark(category._id, bookmark._id)
                            }
                          >
                            <i class='far fa-edit'></i>
                          </td>
                          <td
                            id='currentBookmarkDelete'
                            class='current-bookmark-option'
                            onClick={() =>
                              removeBookmark(category._id, bookmark._id)
                            }
                          >
                            <i class='far fa-trash-alt'></i>
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

          <div class='category-card-container'>
            <div class='category-card'>
              <Link to='./add-category'>
                <div class='category-title'>
                  <div class='plus-container'>
                    <div class='plus-icon'></div>
                  </div>
                </div>
              </Link>
            </div>
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

export default BookmarksScreen
