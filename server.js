const express = require('express')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
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

app.get('/', (request, response) => {
  response.sendFile(path.join(_dirname + '/public/index.html'))
})

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects)
    })
    .catch(() => {
      response.sendStatus(500)
    })
})

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

app.post('/api/v1/projects/:id/palettes', (request, response) => {
  const palette = request.body
  const id = Date.now()

  for (let requiredParameter of ['color_1', 'color_2', 'color_3', 'color_4', 'color_5']) {
    if (!palette[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String> }. You're missing a "${requiredParameter}" property.` })
    }
  }

  database('palettes').insert(palette, 'id')
    .then(palette => {
      response.status(201).json({ id })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
})

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

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
