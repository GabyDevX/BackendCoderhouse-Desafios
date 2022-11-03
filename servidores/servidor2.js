const http = require('http')

const server = http.createServer((peticion, respuesta) => {
  const mensaje = getMensaje()
  respuesta.end(mensaje)
})

const getMensaje = () => {
  const hora = new Date().getHours()

  if (hora >= 6 && hora <= 12) {
    return 'Buenos dias'
  }
  if (hora >= 13 && hora <= 19) {
    return 'Buenas tardes'
  }
  return 'Buenas noches'
}

const connection = server.listen(8080, () => {
  console.log('Servidor iniciado')
})
