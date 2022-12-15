const socket = io()

//MENSAJES

const email = document.querySelector('#email')
const mensaje = document.querySelector('#mensaje')

const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

document.querySelector('#enviarMensaje').addEventListener('click', (e) => {
  e.preventDefault()
  if (email.value !== '' && regexEmail.test(email.value)) {
    socket.emit('mimensaje', {
      email: email.value,
      fyh: new Date().toLocaleString(),
      mensaje: mensaje.value,
    })
  } else {
    alert('Email invalido')
  }

  email.value = ''
  mensaje.value = ''
})

socket.on('mensajes', (data) => {
  const mensajesHTML = data
    .map(
      (msj) =>
        `<strong style="color:blue">${msj.email}</strong> [<span style="color:red">${msj.fyh}</span>]: <span style="color:green">${msj.mensaje}</span>`,
    )
    .join('<br>')

  document.querySelector('#p').innerHTML = mensajesHTML
})

//PRODUCTOS

const titulo = document.querySelector('#titulo')
const precio = document.querySelector('#precio')
const imagen = document.querySelector('#imagen')
const table = document.querySelector('#table')

document.querySelector('#enviarProducto').addEventListener('click', (e) => {
  e.preventDefault()
  socket.emit('miproducto', {
    titulo: titulo.value,
    precio: precio.value,
    imagen: imagen.value,
  })

  titulo.value = ''
  precio.value = ''
  imagen.value = ''
})

socket.on('productos', (data) => {
  if (data.length !== 0) {
    console.log('hola')
    table.className = 'table-responsive'
    const tablaHTML = document.createElement('table')
    tablaHTML.className = 'table table-dark'
    const rows = `<tr style="color: yellow;"> <th>Titulo</th> <th>Precio</th> <th>Imagen</th> </tr>`
    tablaHTML.innerHTML = rows
    data.forEach((p) => {
      tablaHTML.appendChild(productTemplate(p.titulo, p.precio, p.imagen))
    })
    table.innerHTML = ''
    table.append(tablaHTML)
    console.log(table)
    console.log(tablaHTML)
  }
})

const productTemplate = (titulo, precio, imagen) => {
  let elemento = document.createElement('tr')
  elemento.innerHTML = `<td>${titulo}</td>
                         <td>${precio}</td>
                         <td><img style="width: 2rem; height: 'auto'" src="${imagen}"></td>`
  return elemento
}
