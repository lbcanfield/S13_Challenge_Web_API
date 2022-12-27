const express = require('express');
const ACTIONS = require('./actions-model');
const { validateActionId, validateAction } = require('./actions-middlware');

const router = express.Router();

router.get('/', (request, response, next) => {
     ACTIONS.get()
          .then(action => {
               response.json(action)
          })
          .catch(next)
})

router.get('/:id', validateActionId, (request, response, next) => {
     response.json(request.action)
})

router.post('/', validateActionId, validateAction, async (request, response, next) => {
     try {
          const newAction = await ACTIONS.insert(request.body)
          response.status(201).json(newAction)
     }
     catch (error) {
          next(error)
     }
})
// - [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.
// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.


//Error Handling
router.use((error, request, response, next) => {
     response.status(error.status || 500).json({
          message: error.message,
          stack: error.stack
     })
})

module.exports = router;