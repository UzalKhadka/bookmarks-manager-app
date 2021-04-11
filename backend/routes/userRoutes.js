import express from 'express'
import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const router = express.Router()

//CRUD for user

//GET  request
//returns all the users
router.get(
  '/',
  AsyncHandler(async (req, res) => {
    const users = await User.find({})

    res.json(users)
  })
)

//GET  request
//returns a user based on the username
router.get(
  '/:user',
  AsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.params.user })

    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  })
)

//CRUD for categories

//GET  request
//returns all the categories of a certain user
router.get(
  '/:user/categories',
  AsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.params.user })
    const categories = await user.categories

    if (categories) {
      res.json(categories)
    } else {
      res.status(404).json({ message: 'Categories not found' })
    }
  })
)

//GET  request
//returns a category based on the category name
router.get(
  '/:user/categories/:category',
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

//CRUD for bookmarks

//GET  request
//returns all the bookmarks of a certain category
router.get(
  '/:user/categories/:category/bookmarks',
  AsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.params.user })
    const categories = await user.categories
    const category = categories.find((p) => p.name === req.params.category)
    const bookmarks = category.bookmarks

    if (bookmarks) {
      res.json(bookmarks)
    } else {
      res.status(404).json({ message: 'Bookmarks not found' })
    }
  })
)

//GET  request
//returns a bookmark based on the bookmark id
router.get(
  '/:user/categories/:category/bookmarks/:bookmark',
  AsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.params.user })
    const categories = await user.categories
    const category = categories.find((p) => p.name === req.params.category)
    const bookmarks = category.bookmarks
    const bookmark = bookmarks.find((p) => p._id == req.params.bookmark)

    if (bookmark) {
      res.json(bookmark)
    } else {
      res.status(404).json({ message: 'Bookmark not found' })
    }
  })
)

export default router
