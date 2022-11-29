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

document.querySelector('#enviarProducto').addEventListener('click', (e) => {
  e.preventDefault()
  socket.emit('miproducto', {
    titulo: titulo.value,
    precio: precio.value,
    imagen: imagen.value,
  })
})

socket.on('productos', (data) => {
  //   const productosHTML = data
  //     .map(
  //       (msj) =>
  //         `<strong style="color:blue">${msj.email}</strong> [<span style="color:red">${msj.fyh}</span>]: <span style="color:green">${msj.mensaje}</span>`,
  //     )
  //     .join('<br>')
})
