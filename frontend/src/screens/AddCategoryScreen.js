import React, { useState } from 'react'
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
    <section className='add-section'>
      <div className='add-container'>
        <div className='add-content'>
          <div className='add-bookmark-section'>
            <p className='title'>Add a Category</p>
            <form id='add-category-form' className='add-bookmark-form'>
              <div className='form-field'>
                <label for='add-category-name'>Name</label>
                <input
                  id='add-category-name'
                  type='text'
                  placeholder='Enter the Name'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='form-field'>
                <div className='checkbox-container'>
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
              <div className='form-field save-cancel'>
                <Link to='/' onClick={submitHandler}>
                  <div className='button'>Save</div>
                </Link>

                <Link to='/' onClick={resetHandler}>
                  <div className='button'>Cancel</div>
                </Link>
              </div>

              <div className='form-field'>
                <Link to='/add-bookmark'>
                  <div className='button last second-last'>Add a Bookmark</div>
                </Link>
              </div>

              <div className='form-field'>
                <Link to='/'>
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

export default AddCategoryScreen
