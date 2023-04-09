import React from 'react'
import { useState } from 'react'
import classes from './login.module.css'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import img from '../../assets/womaneating2.jpg'
import axios from 'axios'
import { login } from '../../redux/authSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})
  const [serverError, setServerError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    setError(validate({ email, password }))
    if (password !== '' && email !== '') {
      const res = await axios.post('http://localhost:5001/auth/login', {
        email,
        password
      })
      dispatch(login(res.data))
      if (res.data.others.type === 'customer') {
        navigate('/home')
      } else {
        navigate('/staff')
      }
    }
  }

  const validate = values => {
    const errors = {}

    if (!values.password) {
      errors.password = 'Password is required!'
    }
    if (!values.email) {
      errors.email = 'Email is required!'
    }
    return errors
  }

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginWrapper}>
        <div className={classes.loginLeftSide}>
          <img src={img} className={classes.leftImg} />
        </div>
        <div className={classes.loginRightSide}>
          <h2 className={classes.title}>Login</h2>
          <form onSubmit={handleLogin} className={classes.loginForm}>
            <input
              type='email'
              placeholder='Type email'
              onChange={e => setEmail(e.target.value)}
            />
            <p style={{ color: 'red' }}>{error.email}</p>
            <input
              type='password'
              placeholder='Type password'
              onChange={e => setPassword(e.target.value)}
            />
            <p style={{ color: 'red' }}>{error.password}</p>
            <button className={classes.submitBtn}>Login</button>
            {serverError && (
              <p style={{ fontSize: '15px', color: 'red' }}>{serverError}</p>
            )}
            <p>
              Don't have an account? <Link to='/signup'>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
