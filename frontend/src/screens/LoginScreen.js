import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions'

const LoginScreen = ({ history, location }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

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
    dispatch(login(username, password))
  }

  return (
    // <!-- signup section -->
    <section className='login-signup-section'>
      <div className='login-signup-container'>
        <div className='login-signup-content'>
          <div className='main-section'>
            <p className='title'>Log In</p>
            <form className='login-signup-form'>
              <div className='form-field'>
                <label for='signup-username'>Username</label>
                <input
                  id='signup-username'
                  type='text'
                  placeholder='Enter the Username'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='form-field'>
                <label for='signup-password'>Password</label>
                <input
                  id='signup-password'
                  type='password'
                  placeholder='Enter the Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className='form-field'>
                <Link to='/' onClick={submitHandler}>
                  <div className='button'>Log In</div>
                </Link>
              </div>

              <div className='form-field'>
                <p className='prompt-message'>Not registered yet?</p>
                <Link to='/signup'>
                  <div className='button last second-last'>Sign Up</div>
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

export default LoginScreen
