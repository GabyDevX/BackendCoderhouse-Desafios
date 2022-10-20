//Creación de variables
const nombre = 'pepe'
let edad = 25
const precio = '$99.90'
const series = ['Dark', 'Mr Robot', 'Castlevania']
const peliculas = [
  {
    nombre: 'Hustle',
    año: 2022,
    protagonistas: ['Adam Sandler', 'Juancho Hernagomez'],
  },
  {
    nombre: 'Thor: Love and Thunder',
    año: 2022,
    protagonistas: ['Chris Hemsworth', 'Christian Bale', 'Natalie Portman'],
  },
  {
    nombre: 'The Transporter',
    año: 2002,
    protagonistas: ['Jason Statham', 'Shu Qi', 'Ric Young'],
  },
]

//Impresiones en consola
console.log('edad: ' + edad)
console.log('precio: ' + precio)
console.log(`Series: ${series.join(', ')}`)
console.log('peliculas: ')
peliculas.forEach((pelicula) =>
  console.log(
    `${pelicula.nombre}, año: ${
      pelicula.año
    }, protagonistas: ${pelicula.protagonistas.join(', ')}`,
  ),
)

//Operaciones y actualización por consola
edad += 1
console.log('edad: ' + edad)
series.push('Game of Thrones')
console.log(`Series: ${series.join(', ')}`)
