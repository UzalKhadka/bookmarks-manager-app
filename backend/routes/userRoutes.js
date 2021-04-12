import express from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const router = express.Router()

//CRUD for user

//GET  request
//returns all the users
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await User.find({})

    res.json(users)
  })
)

//POST request || Create request
//adds a new user
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, username, password } = req.body

    const userExists = await User.findOne({ username })

    if (userExists) {
      res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({
      name,
      username,
      password,
      categories: [{ name: 'misc', bookmarks: [] }],
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        password: user.password,
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  })
)

//GET  request || Read request
//returns a user based on the username
router.get(
  '/:user',
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.params.user })

    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  })
)

// PUT request || Update request
// updates an existing user
router.put(
  '/:user',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.user)

    if (user) {
      user.name = req.body.name || user.name
      user.username = req.body.username || user.username
      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        password: updatedUser.password,
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  })
)

// DELETE request || Delete request
// deletes a certain user
router.delete(
  '/:user',
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.user)
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        message: 'User deleted',
      })
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
  asyncHandler(async (req, res) => {
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
  asyncHandler(async (req, res) => {
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
  asyncHandler(async (req, res) => {
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
  asyncHandler(async (req, res) => {
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
