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

    if (users) {
      res.status(200).json(users)
    } else {
      res.status(404)
      throw new Error('Users not found')
    }
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
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
)

//GET  request || Read request
//returns a user based on the username
router.get(
  '/:username',
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.params.username })

    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
)

//get based on the userID
// router.get(
//   '/:userID',
//   asyncHandler(async (req, res) => {
//     const user = await User.findOneById(req.params.userID)

//     if (user) {
//       res.status(200).json(user)
//     } else {
//       res.status(404)
//       throw new Error('User not found')
//     }
//   })
// )

// PUT request || Update request
// updates an existing user
router.put(
  '/:userID',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userID)

    if (user) {
      user.name = req.body.name || user.name
      user.username = req.body.username || user.username
      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        password: updatedUser.password,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
)

// DELETE request || Delete request
// deletes a certain user
router.delete(
  '/:userID',
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.userID)

    if (user) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        message: 'User deleted',
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
)

//CRUD for categories

//GET  request
//returns all the categories of a certain user
router.get(
  '/:userID/categories',
  asyncHandler(async (req, res) => {
    const user = await User.findOnebyID(req.params.userID)
    const categories = await user.categories

    if (categories) {
      res.status(200).json(categories)
    } else {
      res.status(404)
      throw new Error('Categories not found')
    }
  })
)

//GET  request
//returns a category based on the category name
router.get(
  '/:userID/categories/:categoryID',
  asyncHandler(async (req, res) => {
    const user = await User.findOnebyID(req.params.userID)
    const categories = await user.categories
    const category = categories.find((p) => p._id === req.params.categoryID)

    if (category) {
      res.status(200).json(category)
    } else {
      res.status(404)
      throw new Error('Category not found')
    }
  })
)

//CRUD for bookmarks

//GET  request
//returns all the bookmarks of a certain category
router.get(
  '/:userID/categories/:categoryID/bookmarks',
  asyncHandler(async (req, res) => {
    const user = await User.findOnebyID(req.params.userID)
    const categories = await user.categories
    const category = categories.find((p) => p._id === req.params.categoryID)
    const bookmarks = category.bookmarks

    if (bookmarks) {
      res.status(200).json(bookmarks)
    } else {
      res.status(404)
      throw new Error('Bookmarks not found')
    }
  })
)

//GET  request
//returns a bookmark based on the bookmark id
router.get(
  '/:userID/categories/:categoryID/bookmarks/:bookmarkID',
  asyncHandler(async (req, res) => {
    const user = await User.findOnebyID(req.params.userID)
    const categories = await user.categories
    const category = categories.find((p) => p._id === req.params.categoryID)
    const bookmarks = category.bookmarks
    const bookmark = bookmarks.find((p) => p._id == req.params.bookmarkID)

    if (bookmark) {
      res.status(200).json(bookmark)
    } else {
      res.status(404)
      throw new Error('Bookmark not found')
    }
  })
)

export default router
