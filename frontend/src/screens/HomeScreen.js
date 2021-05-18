import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    // <!-- hero  -->
    <section class='hero-section'>
      <div class='hero-container'>
        <div class='hero-content'>
          <div class='welcome-message'>
            Welcome{' '}
            <span class='extra'>{userInfo ? userInfo.name : 'Guest User'}</span>
            {userInfo ? (
              <></>
            ) : (
              <div class='login-signup-prompt'>
                <Link to='/login'>
                  <div class='button'>Log In</div>
                </Link>
                <Link to='/signup'>
                  <div class='button'>Sign Up</div>
                </Link>
              </div>
            )}
          </div>
          <div class='my-categories-button'>
            <Link to='/categories'>
              <div class='button'>My Categories</div>
            </Link>
            <Link to='/bookmarks'>
              <div class='button'>My Bookmarks</div>
            </Link>
          </div>
          <div class='add-bookmarks-and-categories'>
            <Link to='/add-bookmark'>
              <div class='button'>Add a Bookmark</div>
            </Link>
            <Link to='/add-category'>
              <div class='button'>Add a Category</div>
            </Link>
          </div>
          <div class='import-export'>
            <Link to='#'>
              <div class='button'>Import Bookmarks</div>
            </Link>
            <Link to='#'>
              <div class='button'>Export Bookmarks</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeScreen
