const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const favicon = require('serve-favicon')

const urlLogger = (request, response, next) => {
  console.log('Request URL: ', request.url)
  next()
}

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString())
  next()
}

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(urlLogger, timeLogger)

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Palette Picker'

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

app.get('/', (request, response) => {
  response.sendFile(path.join(_dirname + '/public/index.html'))
})
