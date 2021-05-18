import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions'

const LoginScreen = ({ history, location }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/bookmarks'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    //dispatch login
    dispatch(login(username, password))
  }

  return (
    // <!-- signup section -->
    <section class='login-signup-section'>
      <div class='login-signup-container'>
        <div class='login-signup-content'>
          <div class='main-section'>
            <p class='title'>Log In</p>
            <form class='login-signup-form'>
              <div class='form-field'>
                <label for='signup-username'>Username</label>
                <input
                  id='signup-username'
                  type='text'
                  placeholder='Enter the Username'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div class='form-field'>
                <label for='signup-password'>Password</label>
                <input
                  id='signup-password'
                  type='password'
                  placeholder='Enter the Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div class='form-field'>
                <a href='#' onClick={submitHandler}>
                  <div class='button'>Log In</div>
                </a>
              </div>

              <div class='form-field'>
                <p class='prompt-message'>Not registered yet?</p>
                <Link to='/signup'>
                  <div class='button last second-last'>Sign Up</div>
                </Link>
              </div>

              <div class='form-field'>
                <a href='#'>
                  <div class='button last'>Go Back</div>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginScreen
