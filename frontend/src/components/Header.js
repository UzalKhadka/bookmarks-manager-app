import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    // <!-- header -->
    <header>
      <div className='header-container'>
        <div className='header-content'>
          <div className='logo'>
            <Link to='/'>
              <span className='golden-color rgb-switcher'>
                Bookmark Manager
              </span>
            </Link>
          </div>
          <ul className='menu'>
            <li>
              <Link to='/' className='menu-button'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/bookmarks' className='menu-button'>
                Bookmarks
              </Link>
            </li>
            <li>
              <Link to='/categories' className='menu-button'>
                Categories
              </Link>
            </li>
            <li>
              <Link to='/import-bookmarks' className='menu-button'>
                Import
              </Link>
            </li>
            <li>
              <Link to='/export-bookmarks' className='menu-button'>
                Export
              </Link>
            </li>
            {userInfo ? (
              <li onClick={logoutHandler}>
                <Link to='/' className='menu-button'>
                  Log Out
                </Link>
              </li>
            ) : (
              <li>
                <Link to='/login' className='menu-button'>
                  Login/Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
