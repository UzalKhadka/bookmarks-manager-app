import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCategoryDetails, updateCategory } from '../actions/userActions'

const EditCategoryScreen = ({ history, match }) => {
  const [name, setName] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const Category = useSelector((state) => state.categoryDetails)
  const { loading, error, category } = Category

  const categoryName = category ? category.name : 'a Category'

  useEffect(() => {
    dispatch(
      getCategoryDetails(userInfo._id, match.params.categoryID),
      setName(category.name),
      category ? setIsPrivate(category.isPrivate) : null
    )
  }, [
    category.isPrivate,
    category.name,
    dispatch,
    match.params.categoryID,
    userInfo._id,
  ])

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(name, isPrivate)

    dispatch(
      updateCategory(userInfo._id, match.params.categoryID, name, isPrivate)
    )
    history.push(`/categories/${match.params.categoryID}`)
    sleep(500)
    dispatch(getCategoryDetails(userInfo._id, match.params.categoryID))
  }

  const resetHandler = (e) => {
    e.preventDefault()
    resetForm()
  }

  const resetForm = () => {
    setName(category.name)
    setIsPrivate(category.isPrivate)
    // document.getElementById('edit-category-form').reset()
  }

  return (
    <section class='add-section'>
      <div class='add-container'>
        <div class='add-content'>
          <div class='add-bookmark-section'>
            <p class='title'>{`Edit ${categoryName}`}</p>
            <form id='edit-category-form' class='add-bookmark-form'>
              <div class='form-field'>
                <label for='add-category-name'>Name</label>
                <input
                  id='add-category-name'
                  type='text'
                  placeholder='Enter the Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div class='form-field'>
                <div class='checkbox-container'>
                  {isPrivate ? (
                    <input
                      type='checkbox'
                      id='add-category-privacy'
                      value='private'
                      checked
                      onChange={(e) => {
                        if (!isPrivate) setIsPrivate(true)
                        else setIsPrivate(false)
                      }}
                    />
                  ) : (
                    <input
                      type='checkbox'
                      id='add-category-privacy'
                      value='private'
                      onChange={(e) => {
                        if (!isPrivate) setIsPrivate(true)
                        else setIsPrivate(false)
                      }}
                    />
                  )}

                  {/* <input
                    type='checkbox'
                    id='add-category-privacy'
                    value='private'
                    checked
                    onChange={(e) => {
                      if (!isPrivate) setIsPrivate(true)
                      else setIsPrivate(false)
                    }}
                  /> */}
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

export default EditCategoryScreen
