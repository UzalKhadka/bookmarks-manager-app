import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signup } from '../actions/userActions'

const SignupScreen = ({ location, history }) => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const userSignup = useSelector((state) => state.userSignup)
  const { loading, error, userInfo } = userSignup

  const redirect = location.search ? location.search.split('=')[1] : '/login'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    //dispatch register
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(signup(username, name, password))
    }
  }

  return (
    // <!-- signup section -->
    <section class='login-signup-section'>
      <div class='login-signup-container'>
        <div class='login-signup-content'>
          <div class='main-section'>
            <p class='title'>Sign Up</p>
            <form class='login-signup-form'>
              <div class='form-field'>
                <label for='signup-name'>Name</label>
                <input
                  id='signup-name'
                  type='text'
                  placeholder='Enter the Name'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                <label for='signup-confirm-password'>Confirm Password</label>
                <input
                  id='signup-confirm-password'
                  type='password'
                  placeholder='Enter the Confirm Password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div class='form-field'>
                <a href='#' onClick={submitHandler}>
                  <div class='button'>Sign Up</div>
                </a>
              </div>

              <div class='form-field'>
                <p class='prompt-message'>Already registered?</p>
                <Link to='/login'>
                  <div class='button last second-last'>Log In</div>
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

export default SignupScreen
