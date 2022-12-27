// add middlewares here related to actions
const ACTIONS = require('./actions-model')

async function validateActionId(request, response, next) {
     try {
          const actionLookUp = await ACTIONS.get(request.params.id)
          if (!actionLookUp) {
               response.status(404).json({
                    message: "Action Not Found"
               })
          }
          else {
               request.action = actionLookUp
               next()
          }
     }
     catch (error) {
          next(error)
     }
}

function validateAction(request, response, next) {
     if (!request.body.project_id || !request.body.description || !request.body.notes) {
          response.status(400).json({
               message: "missing required field"
          })
     }
     else {
          next()
     }
}
module.exports = {
     validateActionId,
     validateAction
}