import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  createBookmark,
  getCategoriesList,
  getCategoryDetails,
} from '../actions/userActions'

const AddBookmarkToCategoryScreen = ({ history, match }) => {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const CategoriesList = useSelector((state) => state.categoryList)
  const { categories } = CategoriesList

  const category = categories.find(
    (category) => category._id === match.params.categoryID
  )

  const categoryName = category ? category.name : 'this Category'

  useEffect(() => {
    dispatch(getCategoriesList(userInfo._id))
    getCategoryDetails(userInfo._id, match.params.categoryID)
  }, [dispatch, match.params.categoryID, userInfo._id])

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (userInfo._id && match.params.categoryID && name && link) {
      dispatch(
        createBookmark(userInfo._id, match.params.categoryID, name, link),
        history.push(`/categories/${match.params.categoryID}`)
      )
      await sleep(500)
      dispatch(getCategoryDetails(userInfo._id, match.params.categoryID))
    }
  }

  const resetHandler = (e) => {
    e.preventDefault()
    resetForm()
  }

  const resetForm = () => {
    setName('')
    setLink('')
    document.getElementById('add-bookmarks-form').reset()
  }

  return (
    // <!-- add a bookmark section -->
    <section className='add-section'>
      <div className='add-container'>
        <div className='add-content'>
          <div className='add-bookmark-section'>
            <p className='title'>{`Add a Bookmark to ${categoryName}`}</p>
            <form id='add-bookmarks-form' className='add-bookmark-form'>
              <div className='form-field'>
                <label for='add-bookmark-name'>Name</label>
                <input
                  id='add-bookmark-name'
                  type='text'
                  placeholder='Enter the Name'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-field'>
                <label for='add-bookmark-link'>Link</label>
                <input
                  id='add-bookmark-link'
                  type='text'
                  placeholder='Enter the Link'
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

export default AddBookmarkToCategoryScreen
