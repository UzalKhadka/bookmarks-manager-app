// import axios from 'axios'
import React, { useState } from 'react'
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
  const { loading, error, category } = categoryDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(getCategoryDetails(userInfo._id, match.params.categoryID))
  }, [dispatch, match.params.categoryID, userInfo._id])

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
      <div class='my-categories-container'>
        <div class='my-categories-content'>
          <div class='my-categories-title'>
            <p class='title'>{category.name}</p>
          </div>
          <ul class='my-bookmarks'>
            <li class='my-bookmarks-table'>
              <div class='table-title'>
                <div class='table-title-name'>
                  <p class='current-category-name'>{category.name}</p>
                  <p class='current-category-privacy-type'>
                    {category.isPrivate === true ? `(Private)` : `(Public)`}
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
                      <th class='current-bookmark-sn current-bookmark-index'>
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
                    {category.bookmarks &&
                      category.bookmarks.map((bookmark, index) => (
                        <tr key={index}>
                          <td class='current-bookmark-sn current-bookmark-index'>
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
            </li>
            <div class='add-bookmark-button'>
              <Link to={`/categories/${category._id}/add-bookmark/`}>
                <div class='button last'>Add A Bookmark</div>
              </Link>
            </div>
          </ul>

          <div class='go-back-button'>
            <Link to='/categories'>
              <div class='button last'>Go Back</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryScreen
