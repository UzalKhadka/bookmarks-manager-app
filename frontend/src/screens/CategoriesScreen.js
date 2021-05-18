// import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCategoriesList } from '../actions/userActions'

const CategoriesScreen = () => {
  const dispatch = useDispatch()

  const CategoriesList = useSelector((state) => state.categoryList)
  const { loading, error, categories } = CategoriesList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(getCategoriesList(userInfo._id))
  }, [dispatch, userInfo._id])

  return (
    // <!-- my categories section -->
    <section id='my-categories'>
      <div class='my-categories-container'>
        <div class='my-categories-content'>
          <div class='my-categories-title'>
            <p class='title'>My Categories</p>
          </div>
          <div class='my-categories'>
            <div class='category-card-container'>
              <div class='category-card'>
                <Link to='/add-category'>
                  <div class='category-title'>
                    <div class='plus-container'>
                      <div class='plus-icon'></div>
                    </div>
                  </div>
                </Link>
                <div class='is-private'>Create</div>
              </div>
            </div>

            {categories.map((category) => (
              <div
                key={category._id}
                id='category-card'
                class='category-card-container'
              >
                <div class='category-card'>
                  <Link to={`/categories/${category._id}`}>
                    <div class='category-title'>{category.name}</div>
                  </Link>
                  <div class='is-private'>
                    {category.isPrivate === true ? `Private` : `Public`}
                  </div>
                </div>
              </div>
            ))}
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

export default CategoriesScreen
