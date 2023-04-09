import React from 'react'
import classes from './cart.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { removeProduct } from '../../redux/cartSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getUser } from '../../redux/authSlice'
const Cart = () => {
  const { products } = useSelector(state => state.cart)
  const user = useSelector(getUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector(state => state.auth)
  let totalPrice = 0
  products.map(product => (totalPrice += product.quantity * product.price))

  const handleRemoveProduct = async id => {
    await axios.delete(`http://localhost:5001/order/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch(removeProduct({ _id: id }))
  }
  const handleOrder = async () => {
    navigate('/otp')
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          {products.length > 0 ? (
            products.map(product => (
              <div key={product._id} className={classes.product}>
                <div
                  onClick={() => handleRemoveProduct(product._id)}
                  className={classes.closeBtn}
                >
                  <AiOutlineClose />
                </div>
                <img
                  src={`http://localhost:5001/images/${product.img}`}
                  className={classes.img}
                />
                <div className={classes.productData}>
                  <h3 className={classes.title}>{product.title}</h3>
                  <div className={classes.productAndQuantity}>
                    <span className={classes.quantity}>
                      {product.quantity} x{' '}
                    </span>
                    <span className={classes.price}>
                      <span>Rs.</span>
                      {product.price}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className={classes.noProducts}>
              No products in the cart. Go shopping!
            </h1>
          )}
        </div>
        <div className={classes.right}>
          <div className={classes.totalProductMsg}>
            Total products: {products.length}
          </div>
          <div className={classes.subtotalCheckoutBtns}>
            <span className={classes.subtotal}>Subtotal: Rs.{totalPrice}</span>
            <span
              onClick={handleOrder}
              disabled={products.length === 0}
              className={classes.orderNowBtn}
            >
              Order now
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
