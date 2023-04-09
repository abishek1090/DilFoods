import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from './signup.module.css'
import img from '../../assets/womaneating.jpg'
import { register } from '../../redux/authSlice'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ID, setID] = useState('')
  const [type, setType] = useState('')
  const [error, setError] = useState({})
  const [serverError, setServerError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = async e => {
    e.preventDefault()
    setError(validate({ username, email, password, type, ID }))
    if (ID === '') {
      setID(null)
    }
    if (
      username !== '' &&
      password !== '' &&
      email !== '' &&
      type !== '' &&
      password !== '' &&
      ID !== ''
    ) {
      try {
        const res = await axios.post('http://localhost:5001/auth/register', {
          username,
          email,
          password,
          type,
          ID
        })

        dispatch(register(res.data))
        navigate('/home')
      } catch (error) {
        setServerError(error.response.data)
      }
    }
  }

  const validate = values => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Username is required!'
    }
    if (!values.password) {
      errors.password = 'Password is required!'
    }
    if (!values.email) {
      errors.email = 'Email is required!'
    }
    if (!values.type) {
      errors.type = 'Choose your type'
    }
    if (type === 'staff') {
      errors.ID = 'ID is required!'
    }
    return errors
  }

  return (
    <div className={classes.signUpContainer}>
      <div className={classes.signUpWrapper}>
        <div className={classes.signUpLeftSide}>
          <img src={img} className={classes.leftImg} />
        </div>
        <div className={classes.signUpRightSide}>
          <h2 className={classes.title}>Sign Up</h2>
          <form onSubmit={handleSignup} className={classes.signUpForm}>
            <input
              type='text'
              placeholder='Type username'
              onChange={e => setUsername(e.target.value)}
            />
            <p style={{ color: 'red' }}>{error.username}</p>
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
            <div style={{ display: 'flex', gap: '20px' }}>
              <input
                type='radio'
                id='staff'
                name='staff'
                value='staff'
                onChange={e => setType(e.target.value)}
              />
              <label for='staff'>Staff</label>
              <input
                type='radio'
                id='customer'
                name='staff'
                value='customer'
                onChange={e => setType(e.target.value)}
              />
              <label for='customer'>Customer</label>

              <p style={{ color: 'red' }}>{error.type}</p>
            </div>
            {type === 'staff' && (
              <input
                placeholder='Enter ID'
                type='text'
                onChange={e => setID(e.target.value)}
              />
            )}
            <p style={{ color: 'red' }}>{error.ID}</p>

            <button className={classes.submitBtn}>Sign Up</button>
            {serverError && (
              <p style={{ fontSize: '15px', color: 'red' }}>{serverError}</p>
            )}
            <p>
              Already have an account? <Link to='/'>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
