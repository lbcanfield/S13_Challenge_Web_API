const PROJECTS = require('./projects-model');

async function validateProjectId(request, response, next) {
     try {
          const projectLookUp = await PROJECTS.get(request.params.id)
          if (!projectLookUp) {
               response.status(404).json({
                    message: "Project Not Found"
               })
          }
          else {
               request.project = projectLookUp;
               next();
          }
     }
     catch (error) {
          next(error)
     }
}

function validateProject(request, response, next) {
     if (!request.body.name || !request.body.description) {
          response.status(400).json({
               message: "missing required field"
          })
     }
     else {
          // request.project = { name: name, description: description }
          next()
     }
}

module.exports = {
     validateProjectId,
     validateProject
}