const authController = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

authController.post('/register', async (req, res) => {
  try {
    const isExisting = await User.findOne({ email: req.body.email })
    if (isExisting) {
      return res
        .status(400)
        .json('Already such an account with this email. Try a new one!')
    }
    if (req.body.type === 'staff') {
      if (req.body.ID !== '2608fe') {
        return res.status(400).json('Invalid ID')
      }
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const newUser = await User.create({ ...req.body, password: hashedPassword })
    const { password, ...others } = newUser._doc
    const token = jwt.sign(
      { id: newUser._id, type: newUser.type },
      '641958e3f2d9d7a30e2608fe',
      { expiresIn: '5h' }
    )

    return res.status(201).json({ others, token })
  } catch (error) {
    return res.status(404).json(error.message)
  }
})

authController.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      throw new Error('User credentials are wrong!')
    }
    const comparePass = await bcrypt.compare(req.body.password, user.password)
    if (!comparePass) {
      return res.status(404).json('User credentials are wrong!')
    }

    const { password, ...others } = user._doc
    const token = jwt.sign(
      { id: user._id, type: user.type },
      '641958e3f2d9d7a30e2608fe',
      { expiresIn: '5h' }
    )

    return res.status(200).json({ others, token })
  } catch (error) {
    return res.status(404).json(error.message)
  }
})

module.exports = authController
