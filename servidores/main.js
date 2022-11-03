const http = require('http')

const server = http.createServer((peticion, respuesta) => {
    respuesta.end('Hola Gabo')
})

const connection = server.listen(8080, () => {
    console.log(`This is the server listening on port ${server.address().port}`)
})