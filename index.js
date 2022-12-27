require('dotenv').config();

const server = require('./api/server.js');

//Environmental Variables
const PORT = process.env.PORT || 9000;
const HOST = process.env.HOSTNAME || 'http://localhost';



server.listen(PORT, () => {
     console.log(`\nListening on ${HOST}:${PORT}\n`)
})