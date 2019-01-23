const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Palette Picker'

app.get('/', (request, response) => {
  
})
