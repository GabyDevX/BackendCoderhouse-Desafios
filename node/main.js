// const numerosSalidos = {}

// const generarNumeroAleatorio = () => {
//   return parseInt(Math.random() * 20) + 1
// }

// for (let index = 0; index < 10000; index++) {
//   const numero = generarNumeroAleatorio()
//   if (!numerosSalidos[numero]) {
//     numerosSalidos[numero] = 0
//   }
//   numerosSalidos[numero]++
// }

// console.log(numerosSalidos)

const productos = [
  { id: 1, nombre: 'Escuadra', precio: 323.45 },
  { id: 2, nombre: 'Regla', precio: 33.45 },
  { id: 3, nombre: 'Calculadora', precio: 3234.45 },
  { id: 4, nombre: 'Cuaderno', precio: 333.45 },
  { id: 5, nombre: 'Reloj', precio: 243.45 },
]

const decimal2 = (val) => Number(val.toFixed(2))

// const getNombres = () => {
//   const nombres = []
//   for (const producto of productos) {
//     nombres.push(producto.nombre)
//   }
//   return nombres.join(',')
// }

// const getPrecioTotal = () => {
//   let precio = 0
//   for (const producto of productos) {
//     precio += producto.precio
//   }
//   return decimal2(precio)
// }

// const getPrecioPromedio = (prods) => {
//   if (prods.length === 0) {
//     return 0
//   }
//   return getPrecioTotal(prods) / prods.length
// }

const getProdMasBarato = (prods) => {
  if (prods.length == 0) {
    return 0
  }
  let precioBarato = prods[0].precio
  let prodBarato = prods[0].nombre
  for (const producto of prods) {
    console.log(producto.nombre)
    console.log(producto.precio)
    if (producto.precio < precioBarato) {
      precioBarato = producto.precio
      prodBarato = producto.nombre
    }
  }
  return `El producto mas barato es ${prodBarato}, con un precio de ${precioBarato}`
}

// productoMasCaro()

// console.log(getNombres(productos))
// console.log(getPrecioTotal(productos))
// console.log(getPrecioPromedio(productos))
console.log(getProdMasBarato(productos))
