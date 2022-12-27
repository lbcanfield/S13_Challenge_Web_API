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


router.put('/:id', validateActionId, validateAction, (request, response, next) => {
     ACTIONS.update(request.params.id, request.body)
          .then(() => {
               return ACTIONS.get(request.params.id)
          })
          .then(project => {
               response.json(request.body)
          })
          .catch(next)
})
// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.


router.delete('/:id', validateActionId, async (request, response, next) => {
     try {
          await ACTIONS.remove(request.params.id)
          response.json(request.body)
     }
     catch (error) {
          next(error)
     }
})



//Error Handling
router.use((error, request, response, next) => {
     response.status(error.status || 500).json({
          message: error.message,
          stack: error.stack
     })
})

module.exports = router;