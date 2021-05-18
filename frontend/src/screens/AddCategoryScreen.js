import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createCategory, getCategoriesList } from '../actions/userActions'

const AddCategoryScreen = ({ location, match, history }) => {
  const [name, setName] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(name, isPrivate)
    //dispatch login
    dispatch(createCategory(userInfo._id, name, isPrivate))
    history.push(`/categories/`)
    dispatch(getCategoriesList(userInfo._id))
  }

  const resetHandler = (e) => {
    e.preventDefault()
    resetForm()
  }

  const resetForm = () => {
    setName('')
    setIsPrivate(false)
    document.getElementById('add-category-form').reset()
  }

  return (
    // <!-- add a category section -->
    <section class='add-section'>
      <div class='add-container'>
        <div class='add-content'>
          <div class='add-bookmark-section'>
            <p class='title'>Add a Category</p>
            <form id='add-category-form' class='add-bookmark-form'>
              <div class='form-field'>
                <label for='add-category-name'>Name</label>
                <input
                  id='add-category-name'
                  type='text'
                  placeholder='Enter the Name'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div class='form-field'>
                <div class='checkbox-container'>
                  <input
                    type='checkbox'
                    id='add-category-privacy'
                    value='private'
                    onChange={(e) => {
                      if (!isPrivate) setIsPrivate(true)
                      else setIsPrivate(false)
                    }}
                  />
                  <label for='add-category-privacy'>Private</label>
                </div>
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
                <Link to='/add-bookmark'>
                  <div class='button last second-last'>Add a Bookmark</div>
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

export default AddCategoryScreen
