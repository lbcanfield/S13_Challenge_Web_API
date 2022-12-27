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
     const { name, description } = request.body;
     if (!name || !description) {
          response.status(400).json({
               message: "missing required field"
          })
     }
     else {
          next()
     }
}

function updateProject(request, response, next) {
     const { name, description, completed } = request.body;
     // console.log(completed === undefined);
     if (!name || !description || completed === undefined) {
          response.status(400).json({
               message: "missing required field"
          })
     }
     else {
          next()
     }
}


module.exports = {
     validateProjectId,
     validateProject,
     updateProject
}