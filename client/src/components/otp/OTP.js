import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Alert } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../firebase.config'
import classes from './login.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../../redux/cartSlice'
import axios from 'axios'
import { getUser } from '../../redux/authSlice'

const PhoneSignUp = () => {
  const [error, setError] = useState('')
  const [number, setNumber] = useState('')
  const [flag, setFlag] = useState(false)
  const { products } = useSelector(state => state.cart)
  const [otp, setOtp] = useState('')
  const [result, setResult] = useState('')
  function setUpRecaptha (number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {},
      auth
    )
    recaptchaVerifier.render()

    return signInWithPhoneNumber(auth, number, recaptchaVerifier)
  }
  const user = useSelector(getUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getOtp = async e => {
    e.preventDefault()

    setError('')
    if (number === '' || number === undefined)
      return setError('Please enter a valid phone number!')
    try {
      const response = await setUpRecaptha(number)
      setResult(response)
      setFlag(true)
    } catch (err) {
      setError(err.message)
    }
  }

  const verifyOtp = async e => {
    e.preventDefault()
    setError('')
    if (otp === '' || otp === null) return
    try {
      await result.confirm(otp)
      if (products.length > 0) {
        products.map(
          async product =>
            await axios.post('http://localhost:5001/order/post', {
              quantity: product.quantity,
              item: product.title,
              user
            })
        )

        navigate('/otp')
      }
      navigate('/checkout')
      dispatch(deleteProduct())
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginWrapper}>
        <div className={classes.loginRightSide}>
          <h2 className={classes.title}>Verify OTP</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <form
            onSubmit={getOtp}
            style={{ display: !flag ? 'block' : 'none' }}
            className={classes.loginForm}
          >
            <PhoneInput
              defaultCountry='IN'
              value={number}
              onChange={setNumber}
              placeholder='Enter Phone Number'
            />
            <div id='recaptcha-container'></div>
            &nbsp;
            <button type='submit' className={classes.submitBtn}>
              Send Otp
            </button>
          </form>

          <form
            onSubmit={verifyOtp}
            style={{ display: flag ? 'block' : 'none' }}
            className={classes.loginForm}
          >
            <input
              type='otp'
              placeholder='Enter OTP'
              onChange={e => setOtp(e.target.value)}
              className={classes.loginForm}
            />
            &nbsp;
            <button type='submit' className={classes.submitBtn}>
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PhoneSignUp
