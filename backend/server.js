const express = require('express')
const bookmarks = require('./data/bookmarks')
const users = require('./data/users')

const app = express()

app.get('/', (req, res) => {
  res.send('Backend API is running...')
})

app.get('/api/bookmarks/', (req, res) => {
  res.json(bookmarks)
})

app.get('/api/bookmarks/:id', (req, res) => {
  const bookmark = bookmarks.find((p) => p._id === req.params.id)
  res.json(bookmark)
})

app.get('/api/users/', (req, res) => {
  res.json(users)
})

app.get('/api/users/:user', (req, res) => {
  const user = users.find((p) => p.username === req.params.user)
  res.json(user)
})

app.listen(5000, console.log('Server running on port 5000'))
