import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
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
  const { bookmark } = Bookmark

  const bookmarkName = bookmark ? bookmark.name : 'a Bookmark'

  useEffect(() => {
    dispatch(
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
  }

  return (
    // <!-- edit a bookmark section -->
    <section className='add-section'>
      <div className='add-container'>
        <div className='add-content'>
          <div className='add-bookmark-section'>
            <p className='title'>{`Edit ${bookmarkName}`}</p>
            <form id='edit-bookmarks-form' className='add-bookmark-form'>
              <div className='form-field'>
                <label for='add-bookmark-name'>Name</label>
                <input
                  id='add-bookmark-name'
                  type='text'
                  placeholder='Enter the Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-field'>
                <label for='add-bookmark-link'>Link</label>
                <input
                  id='add-bookmark-link'
                  type='text'
                  placeholder='Enter the Link'
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>

              <div className='form-field save-cancel'>
                <Link to='/' onClick={submitHandler}>
                  <div className='button'>Save</div>
                </Link>

                <Link to='/' onClick={resetHandler}>
                  <div className='button'>Cancel</div>
                </Link>
              </div>

              <div className='form-field'>
                <Link to={`/categories/${match.params.categoryID}`}>
                  <div className='button last'>Go Back</div>
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
