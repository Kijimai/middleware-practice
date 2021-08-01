const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('dev'))
app.use((req, res, next) => {
  req.requestTime = Date.now()
  console.log(req.method.toUpperCase(), req.path)
  next()
})

app.use(express.static('views'))

app.use('/extra', (req, res, next) => {
  console.log('WELCOME TO THE EXTRA ZONE.')
  next()
})

app.get('/', (req, res) => {
  console.log(`Requested Date: ${req.requestTime}`)
  res.sendFile(__dirname + '/index.html')
})

app.get('/extra', (req, res) => {
  res.sendFile(__dirname + '/extra.html')
})

app.listen(3000, () => console.log("App running on port 3000."))