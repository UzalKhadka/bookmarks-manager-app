import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCategoriesList } from '../actions/userActions'

const CategoriesScreen = () => {
  const dispatch = useDispatch()

  const CategoriesList = useSelector((state) => state.categoryList)
  const { categories } = CategoriesList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(getCategoriesList(userInfo._id))
  }, [dispatch, userInfo._id])

  return (
    // <!-- my categories section -->
    <section id='my-categories'>
      <div className='my-categories-container'>
        <div className='my-categories-content'>
          <div className='my-categories-title'>
            <p className='title'>My Categories</p>
          </div>
          <div className='my-categories'>
            <div className='category-card-container'>
              <div className='category-card'>
                <Link to='/add-category'>
                  <div className='category-title'>
                    <div className='plus-container'>
                      <div className='plus-icon'></div>
                    </div>
                  </div>
                </Link>
                <div className='is-private'>Create</div>
              </div>
            </div>

            {categories.map((category) => (
              <div
                key={category._id}
                id='category-card'
                className='category-card-container'
              >
                <div className='category-card'>
                  <Link to={`/categories/${category._id}`}>
                    <div className='category-title'>{category.name}</div>
                  </Link>
                  <div className='is-private'>
                    {category.isPrivate === true ? `Private` : `Public`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='go-back-button'>
            <Link to='/'>
              <div className='button last'>Go Back</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoriesScreen
