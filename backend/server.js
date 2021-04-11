import express from 'express'
import dotenv from 'dotenv'

import data from './data/data.js'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('Backend API is running...')
})

//GET  request
//returns all the users
app.get('/api/users/', (req, res) => {
  res.json(data)
})

//GET  request
//returns a user based on the username
app.get('/api/users/:user', (req, res) => {
  const user = data.find((p) => p.username === req.params.user)
  res.json(user)
})

//GET  request
//returns all the categories of a certain user
app.get('/api/users/:user/categories/', (req, res) => {
  const user = data.find((p) => p.username === req.params.user)
  const categories = user.categories
  res.json(categories)
})

//GET  request
//returns a category based on the category name
app.get('/api/users/:user/categories/:category', (req, res) => {
  const user = data.find((p) => p.username === req.params.user)
  const categories = user.categories

  const category = categories.find((p) => p.name === req.params.category)
  res.json(category)
})

//GET  request
//returns all the bookmarks of a certain category
app.get('/api/users/:user/categories/:category/bookmarks/', (req, res) => {
  const user = data.find((p) => p.username === req.params.user)
  const categories = user.categories

  const category = categories.find((p) => p.name === req.params.category)

  bookmarks = category.bookmarks

  res.json(bookmarks)
})

//GET  request
//returns a bookmark based on the bookmark id
app.get(
  '/api/users/:user/categories/:category/bookmarks/:bookmark',
  (req, res) => {
    const user = data.find((p) => p.username === req.params.user)
    const categories = user.categories

    const category = categories.find((p) => p.name === req.params.category)

    const bookmarks = category.bookmarks
    const bookmark = bookmarks.find((p) => p._id === req.params.bookmark)

    res.json(bookmark)
  }
)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))
