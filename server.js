// require express
const express = require('express')
// specify type of environment
const environment = process.env.NODE_ENV || 'development';
// require knexfile to configure the environment
const configuration = require('./knexfile')[environment];
// require the configured database
const database = require('knex')(configuration);
// require path module
const path = require('path')
// requires body-parser module for Express
const bodyParser = require('body-parser')
// imports app from Express to enable Express
const app = express()
// requires serve-favicon middleware to allow Node to change the favicon
const favicon = require('serve-favicon')

// console.logs the request url
const urlLogger = (request, response, next) => {
  console.log('Request URL: ', request.url)
  next()
}

// console.logs the time of the request
const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString())
  next()
}

// tells our app to use bodyParser to extract the request for express
app.use(bodyParser.json())
// serves static files from public folder for express
app.use(express.static('public'))
// tells favicon what directory to get the favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// runs urlLogger and timeLogger on each rerun of the app
app.use(urlLogger, timeLogger)


// tells express what port to host app on
app.set('port', process.env.PORT || 3000)
// gives app a title
app.locals.title = 'Palette Picker'

// renders the home page of the app
app.get('/', (request, response) => {
  response.sendFile(path.join(_dirname + '/public/index.html'))
})

// gets all the stored projects from the server
app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects)
    })
    .catch(() => {
      response.sendStatus(500)
    })
})

// posts a new project to the server
app.post('/api/v1/projects', (request, response) => {
  const project = request.body
  const id = Date.now()

  for (let requiredParameter of ['name']) {
    if (!project[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }  

  database('projects').insert(project, 'id')
    .then(project => {
      response.status(201).json({ id })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
})


// gets a project from the server by id from the server
app.get('/api/v1/projects/:id', (request, response) => {
  const projectID = parseInt(request.params.id)

  database('projects')
    .where('id', projectID)
    .then(() => {
      response.status(200).json(project)
    })
    .catch(() => {
      response.sendStatus(404)
    })
})

// deletes a project from the server by id on the server
app.delete('/api/v1/projects/:id', (request, response) => {
  const projectID = parseInt(request.params.id)

  database('projects')
    .where('id', projectID)
    .del()
    .then(() => {
      response.status(200).json({ projectID })
    })      
    .catch(() => {
      response.sendStatus(404)
    })
})


// gets all the pallets belonging to a project from the server
app.get('/api/v1/projects/:id/palettes', (request, response) => {
  const id = parseInt(request.params.id)

  database('palettes')
    .where('project_id', id)
    .then((palette) => {
      response.status(200).json(palette)
    })
    .catch(() => {
      response.sendStatus(404)
    })
})


// posts a new palette for a project to the server
app.post('/api/v1/projects/:id/palettes', (request, response) => {
  const palette = request.body
  const id = palette.id

  for (let requiredParameter of ['color_1', 'color_2', 'color_3', 'color_4', 'color_5']) {
    if (!palette[requiredParameter]) {  
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String> }. You're missing a "${requiredParameter}" property.` })
    }
  }
  console.log(palette)
  database('palettes').insert(palette)
    .then(palette => {
      response.status(201).json({ id })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
})

// gets a palette by id of a project from the server
app.get('/api/v1/projects/:projectID/palettes/:paletteID', (request, response) => {
  const projectID = parseInt(request.params.projectID)
  const paletteID = parseInt(request.params.paletteID)

  database('palettes')
    .where('project_id', projectID)
    .andWhere('id', paletteID)
    .then((palette) => {
      response.status(200).json(palette)
    })
    .catch(() => {
      response.sendStatus(404)      
    })
})


// deletes a palette by id of a project from the server
app.delete('/api/v1/projects/:projectID/palettes/:paletteID', (request, response) => {
  const projectID = parseInt(request.params.projectID)
  const paletteID = parseInt(request.params.paletteID)

  database('palettes')
    .where('project_id', projectID)
    .andWhere('id', paletteID)
    .del()
    .then(() => {
      response.status(200).json({ paletteID })
    })      
    .catch(() => {
      response.sendStatus(404)
    })    

})


// console.logs which port is hosting the app on every server reboot
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
