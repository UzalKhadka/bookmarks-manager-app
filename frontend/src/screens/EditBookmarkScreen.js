import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getCategoriesList,
  getBookmarkDetails,
  updateBookmark,
  getCategoryDetails,
} from '../actions/userActions'

const EditBookmarkScreen = ({ history, match }) => {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const Bookmark = useSelector((state) => state.bookmarkDetails)
  const { loading, error, bookmark } = Bookmark

  const bookmarkName = bookmark ? bookmark.name : 'a Bookmark'

  useEffect(() => {
    dispatch(
      // getCategoriesList(userInfo._id),
      getBookmarkDetails(
        userInfo._id,
        match.params.categoryID,
        match.params.bookmarkID
      ),
      setName(bookmark.name),
      setLink(bookmark.link)
    )
  }, [
    bookmark.link,
    bookmark.name,
    dispatch,
    match.params.bookmarkID,
    match.params.categoryID,
    userInfo._id,
  ])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      updateBookmark(
        userInfo._id,
        match.params.categoryID,
        match.params.bookmarkID,
        name,
        link
      )
    )
    history.push(`/categories/${match.params.categoryID}`)
    dispatch(getCategoryDetails(userInfo._id, match.params.categoryID))
  }

  const resetHandler = (e) => {
    e.preventDefault()
    resetForm()
  }

  const resetForm = () => {
    setName(bookmark.name)
    setLink(bookmark.link)
    // document.getElementById('edit-bookmarks-form').reset()
  }

  return (
    // <!-- edit a bookmark section -->
    <section class='add-section'>
      <div class='add-container'>
        <div class='add-content'>
          <div class='add-bookmark-section'>
            <p class='title'>{`Edit ${bookmarkName}`}</p>
            <form id='edit-bookmarks-form' class='add-bookmark-form'>
              <div class='form-field'>
                <label for='add-bookmark-name'>Name</label>
                <input
                  id='add-bookmark-name'
                  type='text'
                  placeholder='Enter the Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div class='form-field'>
                <label for='add-bookmark-link'>Link</label>
                <input
                  id='add-bookmark-link'
                  type='text'
                  placeholder='Enter the Link'
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>

              <div class='form-field save-cancel'>
                <a href='#' onClick={submitHandler}>
                  <div class='button'>Save</div>
                </a>

                <a href='#' onClick={resetHandler}>
                  <div class='button'>Cancel</div>
                </a>
              </div>

              <div class='form-field'>
                <Link to={`/categories/${match.params.categoryID}`}>
                  <div class='button last'>Go Back</div>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EditBookmarkScreen
