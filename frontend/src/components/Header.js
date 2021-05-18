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
      <div class='header-container'>
        <div class='header-content'>
          <div class='logo'>
            <Link to='/'>
              <span class='golden-color rgb-switcher'>Bookmark Manager</span>
            </Link>
          </div>
          <ul class='menu'>
            <li>
              <Link to='/' class='menu-button'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/bookmarks' class='menu-button'>
                Bookmarks
              </Link>
            </li>
            <li>
              <Link to='/categories' class='menu-button'>
                Categories
              </Link>
            </li>
            <li>
              <Link to='/import-bookmarks' class='menu-button'>
                Import
              </Link>
            </li>
            <li>
              <Link to='/export-bookmarks' class='menu-button'>
                Export
              </Link>
            </li>
            {userInfo ? (
              <li onClick={logoutHandler}>
                <Link to='/' class='menu-button'>
                  Log Out
                </Link>
              </li>
            ) : (
              <li>
                <Link to='/login' class='menu-button'>
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
