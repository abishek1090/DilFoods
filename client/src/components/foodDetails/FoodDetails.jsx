import React from 'react'
import classes from './foodDetails.module.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { addProduct } from '../../redux/cartSlice'

import axios from 'axios'

const FoodDetails = () => {
  const [foodDetails, setFoodsDetails] = useState('')
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)
  const [price, setPrice] = useState(0)

  const type = useSelector(state => state.auth.user.type)
  const { id } = useParams()
  const { token } = useSelector(state => state.auth)
  const { products } = useSelector(state => state.cart)

  useEffect(() => {
    const fetchFoodDetails = async () => {
      const res = await fetch(`http://localhost:5001/product/find/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (data.msg != undefined) {
        navigate('/login')
      } else {
        setFoodsDetails(data)
      }
    }
    fetchFoodDetails()
  }, [id])

  const changeQuantity = command => {
    if (command === 'dec') {
      if (quantity === 1) return
      setQuantity(prev => prev - 1)
    } else if (command === 'inc') {
      setQuantity(prev => prev + 1)
    }
  }

  const handleEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5001/product/update/${id}`,
        { price },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      navigate('/home')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      navigate('/home')
    } catch (error) {
      console.log(error)
    }
  }

  const addToCart = () => {
    dispatch(addProduct({ ...foodDetails, quantity }))
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img src={`http://localhost:5001/images/${foodDetails?.img}`} />
        </div>
        {type === 'customer' && (
          <div className={classes.right}>
            <h2 className={classes.title}>{foodDetails?.title}</h2>
            <div className={classes.price}>
              Price: <span>Rs.</span> {foodDetails?.price}
            </div>
            <div className={classes.quantity}>
              <button
                disabled={quantity === 1}
                onClick={() => changeQuantity('dec')}
              >
                -
              </button>
              <span className={classes.quantityNumber}>{quantity}</span>
              <button onClick={() => changeQuantity('inc')}>+</button>
            </div>
            <div className={classes.category}>
              <h3>Category: </h3>
              <span className={classes.categoryName}>
                {foodDetails?.category}
              </span>
            </div>
            <button onClick={addToCart} className={classes.addToCart}>
              Add To Cart <AiOutlineShoppingCart />
            </button>
          </div>
        )}
        {type === 'staff' && (
          <div className={classes.right}>
            <h2 className={classes.title}>{foodDetails?.title}</h2>
            <div className={classes.price}>
              Price: <span>Rs.</span> {foodDetails?.price}
              <button
                onClick={() => setEdit(true)}
                className={classes.addToCart}
              >
                Edit
              </button>
              {edit && (
                <div>
                  <input
                    type='text'
                    placeholder='Enter Price'
                    onChange={e => setPrice(e.target.value)}
                  />
                  <button onClick={handleEdit} className={classes.addToCart}>
                    Submit
                  </button>
                </div>
              )}
              <button onClick={handleDelete} className={classes.addToCart}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodDetails
