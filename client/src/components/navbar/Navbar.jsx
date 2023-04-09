import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from './navbar.module.css'
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authSlice'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { products } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  const handleLogin = () => {
    navigate('/')
  }

  const user = useSelector(state => state.auth.user)

  return (
    <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          {user !== 'staff' && <h3 className={classes.title}>DilFoods</h3>}
        </div>
        <div className={classes.center}>
          <ul className={classes.list}>
           
            {user === 'staff' && (
              <li className={classes.listItem}>
                <Link to='/create'>Create</Link>
              </li>
            )}
           
          </ul>
        </div>
        <div className={classes.right}>
          {user !== null && <AiOutlineUser className={classes.userIcon} />}
         
            <Link to='/cart' className={classes.cartContainer}>
              <AiOutlineShoppingCart className={classes.cartIcon} />
              <div className={classes.cartQuantity}>{products.length}</div>
            </Link>
          {user !== null && (
            <button onClick={handleLogout} className={classes.logout}>
              Logout
            </button>
          )}
          {user === null && (
            <button onClick={handleLogin} className={classes.logout}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
