const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Epale pa')
})

app.get('/inicio', (req, res) => {
    res.send('Epale pa ahora es inicio')
})

const PORT = 8080

const server = app.listen(PORT, () => {
  console.log('Servidor iniciado')
})

server.on('error', (err) => {
  console.log('hubo un error: ' + err)
})

