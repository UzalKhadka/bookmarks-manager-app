const express = require('express')
const data = require('./data/data')

const app = express()

app.get('/', (req, res) => {
  res.send('Backend API is running...')
})

app.get('/api/users/', (req, res) => {
  res.json(data)
})

app.get('/api/users/:user', (req, res) => {
  const user = data.find((p) => p.username === req.params.user)
  res.json(user)
})

app.get('/api/users/:user/bookmarks/', (req, res) => {
  const user = data.find((p) => p.username === req.params.user)
  bookmarks = user.bookmarks
  res.json(bookmarks)
})

app.get('/api/users/:user/bookmarks/:id', (req, res) => {
  const user = data.find((p) => p.username === req.params.user)
  bookmarks = user.bookmarks

  const bookmark = bookmarks.find((p) => p._id === req.params.id)
  res.json(bookmark)
})

app.listen(5000, console.log('Server running on port 5000'))
