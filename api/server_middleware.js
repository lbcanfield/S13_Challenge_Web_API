function serverLogger(request, response, next) {
     const timeStamp = new Date().toLocaleString();
     const method = request.method;
     const url = request.url;
     console.log(`[${timeStamp}] -- ${method} to ${url}`)
     next()
}

module.exports = { serverLogger };