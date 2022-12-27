const express = require('express');
const PROJECTS = require('./projects-model');
const {
     validateProjectId,
     validateProject,
     validateProjectUpdate
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
})/////////////////////////////////////////////////////////////////////////////////////

router.put('/:id', validateProjectId, validateProject, (request, response, next) => {
     PROJECTS.update(request.params.id, request.body)
          .then(() => {
               return PROJECTS.get(request.params.id)
          })
          .then(project => {
               response.json(request.body)
          })
          .catch(next)
})//////////////////////////////////////////////////////////////////////////////////////


// - [ ] `[PUT] /api/projects/:id`
//   - Returns the updated project as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.

router.delete('/:id', validateProjectId, async (request, response, next) => {
     try {
          await PROJECTS.remove(request.params.id)
          response.json(request.body)
     }
     catch (error) {
          next(error)
     }
})

router.get('/:id/actions', validateProjectId, async (request, response, next) => {
     console.log(request.params.id)
     try {
          response.json(await PROJECTS.getProjectActions(request.params.id))
     }
     catch (error) {
          next(error)
     }
})
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