const orderController = require('express').Router()
const Order = require('../models/order')
const { verifyToken } = require('../middlewares/verifyToken')
const { count } = require('../models/User')

orderController.get('/', async (req, res) => {
  try {
    const Orders = await Order.aggregate([
      {
        $group: {
          _id: '$item',
          total: { $sum: '$quantity' }
        }
      }
    ])
    return res.status(200).json(Orders)
  } catch (error) {
    console.error(error)
  }
})
orderController.post('/post', async (req, res) => {
  try {
    await Order.create(req.body)

    return res.status(200).json('Order placed')
  } catch (error) {
    return res.status(404).json(error.message)
  }
})

orderController.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const productId = req.params.id
    await Order.deleteOne({ _id: productId })

    return res.status(200).json('Deleted')
  } catch (error) {
    console.error(error)
  }
})

orderController.delete('/deleteItem/:item', verifyToken, async (req, res) => {
  try {
    await Order.deleteMany({ item: req.params.item })

    return res.status(200).json('Deleted')
  } catch (error) {
    console.error(error)
  }
})

orderController.put('/put/:item', verifyToken, async (req, res) => {
  const count = req.params.quantity - req.params.count
  try {
    await Order.findByIdAndUpdate(req.params.item, { quantity: count })

    return res.status(200).json('Updated')
  } catch (error) {
    console.error(error)
  }
})

module.exports = orderController
