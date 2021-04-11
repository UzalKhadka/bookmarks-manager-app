import express from 'express'
import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const router = express.Router()

//CRUD for categories

//GET  request
//returns all the categories of a certain user
router.get(
  '/',
  AsyncHandler(async (req, res) => {
    console.log(req.params.user)
    const user = await User.findOne({ username: req.params.user })
    const categories = await user.categories

    if (categories) {
      res.json(categories)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  })
)

//GET  request
//returns a category based on the category name
router.get(
  '/:category',
  AsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.params.user })
    const categories = await user.categories
    const category = categories.find((p) => p.name === req.params.category)

    if (category) {
      res.json(category)
    } else {
      res.status(404).json({ message: 'Category not found' })
    }
  })
)

export default router
