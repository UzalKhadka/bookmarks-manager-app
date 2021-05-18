import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  createBookmark,
  getBookmarkDetails,
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
  const { loading, error, categories } = CategoriesList

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
    // console.log(name, link, categoryID)

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
    <section class='add-section'>
      <div class='add-container'>
        <div class='add-content'>
          <div class='add-bookmark-section'>
            <p class='title'>{`Add a Bookmark to ${categoryName}`}</p>
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

export default AddBookmarkToCategoryScreen
