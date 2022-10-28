const fs = require('fs')

// try {
//   fs.writeFileSync('./fyh.txt', new Date().toLocaleString())
// } catch (error) {
//   throw new Error('Error escribiendo el archivo: ' + error)
// }

// try {
//   const fechaHora = fs.readFileSync('./fyh.txt', 'utf-8')
//   console.log(fechaHora)
// } catch (error) {
//   throw new Error('Error leyendo el archivo: ' + error)
// }

// fs.writeFile('./fyh2.txt', new Date().toLocaleString(), (error) => {
//   if (error) throw new Error('Error escribiendo archivo 2: ' + error)
// })

// fs.readFile('./fyh2.txt', 'utf-8', (error, data) => {
//   if (error) throw new Error('Error: ' + error)
//   else console.log(data)
// })

///////////////////////////////////////////////////////////

// fs.readFile('./package.json', 'utf-8', (error, data) => {
//   if (error) throw new Error('Error en la lectura: ' + error)
//   console.log(data)

//   const info = {
//     contenidoStr: data,
//     contenidoObj: JSON.parse(data),
//     size: data.length,
//   }

//   console.log(info)

//   fs.writeFile('./info.txt', JSON.stringify(info, null, 2), (error) => {
//     if (error) throw new Error('Error en la escritura: ' + error)

//     console.log('Escritura exitosa')
//   })
// })

///////////////////////////////////////////////////////////

// const newMode = () => {
//   fs.promises
//     .readFile('./info.txt', 'utf-8')
//     .then((data) => {
//       const info = JSON.parse(data)
//       console.log(info)

//       const packageObjeto = info.contenidoObj
//       packageObjeto.author = 'Coderhouse'

//       fs.promises
//         .writeFile(
//           './package.json.coder',
//           JSON.stringify(packageObjeto, null, 2),
//         )
//         .then(() => {
//           console.log('Escritura exitosa')
//         })
//         .catch((error) => {
//           console.log('error: ' + error)
//         })
//     })
//     .catch((error) => console.log('error: ' + error))
// }
// newMode()
