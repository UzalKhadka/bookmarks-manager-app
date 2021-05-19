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
  const { userInfo } = userSignup

  const redirect = location.search ? location.search.split('=')[1] : '/login'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      console.log(message)
    } else {
      dispatch(signup(username, name, password))
    }
  }

  return (
    // <!-- signup section -->
    <section className='login-signup-section'>
      <div className='login-signup-container'>
        <div className='login-signup-content'>
          <div className='main-section'>
            <p className='title'>Sign Up</p>
            <form className='login-signup-form'>
              <div className='form-field'>
                <label for='signup-name'>Name</label>
                <input
                  id='signup-name'
                  type='text'
                  placeholder='Enter the Name'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                <label for='signup-confirm-password'>Confirm Password</label>
                <input
                  id='signup-confirm-password'
                  type='password'
                  placeholder='Enter the Confirm Password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className='form-field'>
                <Link to='/' onClick={submitHandler}>
                  <div className='button'>Sign Up</div>
                </Link>
              </div>

              <div className='form-field'>
                <p className='prompt-message'>Already registered?</p>
                <Link to='/login'>
                  <div className='button last second-last'>Log In</div>
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

export default SignupScreen
