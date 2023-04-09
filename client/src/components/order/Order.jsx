import React, { useEffect, useMemo, useState } from 'react'
import { addOrder } from '../../redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { json } from 'react-router-dom'

export const Order = () => {
  const [count, setCount] = useState([])
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(0)
  const [edit, setEdit] = useState(false)
  const [render, setRender] = useState(false)
  const { token } = useSelector(state => state.auth)

  const data = useSelector(state => state.cart.orders)

  useMemo(() => {
    fetch('http://localhost:5001/order')
      .then(response => response.json())
      .then(data => dispatch(addOrder(data)))
  }, [render])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '95px',
        marginTop: '150px',
        gap: '20px'
      }}
    >
      <h2>Orders</h2>
      {data.length !== 0 &&
        data.map((data, index) => (
          <div key={index}>
            <h6 style={{ fontSize: '18px' }}>{data._id}</h6>
            <span style={{ display: 'flex', gap: '10px' }}>
              {data.total}

              <button
                style={{
                  padding: '5px',
                  background: 'red',
                  borderRadius: '10px',
                  border: 'none'
                }}
                onClick={async () => {
                  const item = { item: data._id }
                  try {
                    await axios.delete(
                      `http://localhost:5001/order/deleteItem/${item.item}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`
                        }
                      }
                    )
                    setRender(!render)
                  } catch (error) {
                    console.log(error)
                  }
                }}
              >
                Delete
              </button>
              {edit && (
                <div>
                  <input
                    type='text'
                    placeholder='Enter quantity'
                    onChange={e => setQuantity(e.target.value)}
                  />
                  <button>Submit</button>
                </div>
              )}
            </span>
          </div>
        ))}
      {data.length === 0 && <span>No Orders available</span>}
    </div>
  )
}

export default Order
