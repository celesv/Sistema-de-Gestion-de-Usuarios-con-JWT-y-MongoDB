const express = require('express')
const app = express()
const port = 3000

// GET
app.get('/', (req, res) => {
  res.send('Hello World! desde get')
})

// POST
app.post('/', (req, res) => {
  res.send('Hello World! desde post')
})

// PUT
app.put('/', (req, res) => {
  res.send('Hello World! desde put')
})

// DELETE
app.delete('/', (req, res) => {
  res.send('Hello World! desde delete')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})