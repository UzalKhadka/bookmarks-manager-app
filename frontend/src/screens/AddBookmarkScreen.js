import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  createBookmark,
  getCategoriesList,
  getCategoryDetails,
} from '../actions/userActions'

const AddBookmarkScreen = ({ history, match }) => {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [categoryID, setCategoryID] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const CategoriesList = useSelector((state) => state.categoryList)
  const { loading, error, categories } = CategoriesList

  useEffect(() => {
    dispatch(getCategoriesList(userInfo._id))
  }, [dispatch, userInfo._id])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(name, link, categoryID)

    dispatch(createBookmark(userInfo._id, categoryID, name, link))

    history.push(`/categories/${categoryID}`)
    dispatch(getCategoryDetails(userInfo._id, categoryID))
  }

  const resetHandler = (e) => {
    e.preventDefault()
    resetForm()
  }

  const resetForm = () => {
    setName('')
    setLink('')
    setCategoryID('')
    document.getElementById('add-bookmarks-form').reset()
  }

  return (
    // <!-- add a bookmark section -->
    <section class='add-section'>
      <div class='add-container'>
        <div class='add-content'>
          <div class='add-bookmark-section'>
            <p class='title'>Add a Bookmark</p>
            <form id='add-bookmarks-form' class='add-bookmark-form'>
              <div class='form-field'>
                <label for='add-bookmark-name'>Name</label>
                <input
                  id='add-bookmark-name'
                  type='text'
                  placeholder='Enter the Name'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div class='form-field'>
                <label for='add-bookmark-link'>Link</label>
                <input
                  id='add-bookmark-link'
                  type='text'
                  placeholder='Enter the Link'
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <div class='form-field'>
                <label for='add-bookmark-category'>Category</label>
                <select
                  id='add-bookmark-category'
                  onChange={(e) => {
                    setCategoryID(e.target.value)
                  }}
                >
                  <option disabled selected value>
                    Select Category
                  </option>

                  {categories.map((category, index) => (
                    <option key={index} class='option' value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
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
                <Link to='./add-category'>
                  <div class='button last second-last'>Add a Category</div>
                </Link>
              </div>

              <div class='form-field'>
                <Link to='/'>
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

export default AddBookmarkScreen
