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



app.locals.savedProjects = [

]




app.get('/', (request, response) => {
  response.sendFile(path.join(_dirname + '/public/index.html'))
})

app.get('/api/v1/projects', (request, response) => {
  const { savedProjects } = app.locals
  response.status(200).json({ savedProjects })
})

app.post('/api/v1/projects', (request, response) => {
  const { project } = request.body
  const id = Date.now()

  if (project) {
    app.locals.savedProjects.push({...project, id})    

    response.status(200).json({ id })
  }
  else {
    response.sendStatus(422)
  }
})

app.get('/api/v1/projects/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const project = app.locals.savedProjects.find(project => project.id === id)

  if (project) {
    response.status(200).json({ project })    
  }
  else {
    response.sendStatus(404)
  }
})

app.delete('/api/v1/projects/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const project = app.locals.savedProjects.find(project => project.id === id)

  if (project) {
    app.locals.savedProjects = app.locals.savedProjects.filter((project, index) => { 
      if (project.id === id) {
        app.locals.savedProjects.splice(index, 1)
      } 
    })
    response.status(200)
  }
  else {
    response.sendStatus(404)
  }
})

app.get('/api/v1/projects/:id/palettes', (request, response) => {
  const id = parseInt(request.params.id)
  const project = app.locals.savedProjects.find(project => project.id === id)

  if (project) {
    response.status(200).json({ project.palettes })    
  }
  else {
    response.sendStatus(404)
  }
})

app.post('/api/v1/projects/:id/palettes', (request, response) => {
  const { palette } = request.body
  const project = app.locals.savedProjects.find(project => project.id === projectID)
  const id = Date.now()

  if (palette) {
    project.push({...palette, id})    

    response.status(200).json({ id })
  }
  else {
    response.sendStatus(422)
  }  
})

app.get('/api/v1/projects/:projectID/palettes/:paletteID', (request, response) => {
  const projectID = parseInt(request.params.projectID)
  const paletteID = parseInt(request.params.paletteID)
  const project = app.locals.savedProjects.find(project => project.id === projectID)
  const palette = project.palettes.find(palette => palette.id === paletteID)

  if (palette) {
    response.status(200).json({ palette })    
  }
  else {
    response.sendStatus(404)
  }
})

app.delete('/api/v1/projects/:projectID/palettes/:paletteID', (request, response) => {
  const projectID = parseInt(request.params.projectID)
  const paletteID = parseInt(request.params.paletteID)
  let project = app.locals.savedProjects.find(project => project.id === projectID)
  const palette = project.palettes.find(palette => palette.id === paletteID)

  if (palette) {
    project.palettes = project.palettes.filter((palette, index) => { 
      if (palette.id === id) {
        project.palettes.splice(index, 1)
      } 
    })    
  }
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
