const express = require('express');
const PROJECTS = require('./projects-model');
const {
     validateProjectId,
     validateProject
} = require('./projects-middleware');

const router = express.Router();



router.get('/', (request, response, next) => {
     PROJECTS.get()
          .then(projects => {
               response.json(projects)
          })
          .catch(next)
})

router.get('/:id', validateProjectId, (request, response) => {
     response.json(request.project)
})


router.post('/', validateProject, (request, response, next) => {
     PROJECTS.insert(request.body)
          .then(newProject => {
               response.status(201).json(newProject)
          })
          .catch(next)
})
// - [ ] `[POST] /api/projects`
//   - Returns the newly created project as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.


// - [ ] `[PUT] /api/projects/:id`
//   - Returns the updated project as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
// - [ ] `[DELETE] /api/projects/:id`
//   - Returns no response body.
//   - If there is no project with the given `id` it responds with a status code 404.
// - [ ] `[GET] /api/projects/:id/actions`
//   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
//   - If there is no project with the given `id` it responds with a status code 404.

//Error Handling 
router.use((error, request, response, next) => {
     response.status(error.status || 500).json({
          message: error.message,
          stack: error.stack
     })
})


module.exports = router