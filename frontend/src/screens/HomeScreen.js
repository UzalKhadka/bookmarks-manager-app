import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    // <!-- hero  -->
    <section className='hero-section'>
      <div className='hero-container'>
        <div className='hero-content'>
          <div className='welcome-message'>
            Welcome{' '}
            <span className='extra'>
              {userInfo ? userInfo.name : 'Guest User'}
            </span>
            {userInfo ? (
              <></>
            ) : (
              <div className='login-signup-prompt'>
                <Link to='/login'>
                  <div className='button'>Log In</div>
                </Link>
                <Link to='/signup'>
                  <div className='button'>Sign Up</div>
                </Link>
              </div>
            )}
          </div>
          <div className='my-categories-button'>
            <Link to='/categories'>
              <div className='button'>My Categories</div>
            </Link>
            <Link to='/bookmarks'>
              <div className='button'>My Bookmarks</div>
            </Link>
          </div>
          <div className='add-bookmarks-and-categories'>
            <Link to='/add-bookmark'>
              <div className='button'>Add a Bookmark</div>
            </Link>
            <Link to='/add-category'>
              <div className='button'>Add a Category</div>
            </Link>
          </div>
          <div className='import-export'>
            <Link to='/import-bookmarks'>
              <div className='button'>Import Bookmarks</div>
            </Link>
            <Link to='/import-bookmarks'>
              <div className='button'>Export Bookmarks</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeScreen
