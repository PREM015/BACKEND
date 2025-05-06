import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})