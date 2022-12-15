const { options } = require('./options/mysqlconn')
console.log(options)
const knex = require('knex')(options)

const usuarios = [
  { nombre: 'hola', apellido: 'que', edad: 19, email: 'tal' },
  { nombre: 'hola', apellido: 'que', edad: 19, email: 'tal' },
  { nombre: 'hola', apellido: 'que', edad: 19, email: 'tal' },
]

knex('usuarios')
  .insert(usuarios)
  .then(() => console.log(' se ingresaron'))
  .catch((err) => console.log(err))
  .finally(() => {
    knex.destroy()
  })
