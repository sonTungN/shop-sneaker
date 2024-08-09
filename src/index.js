const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World Again!')
})

app.listen(port, () => {
  console.log(`Sneaker Shop server starts on http://localhost:${port}/`)
})