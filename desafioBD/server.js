//SERVER
const SqlContainer = require ("./models/SqlContainer.js")
const { optionsSql, optionsSqlite } = require ("./dbOptions/sqlConnection.js")
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './public/views')

let productos = new SqlContainer(optionsSql, "products");
let mensajes = new SqlContainer(optionsSqlite, "messages");

io.on('connection', async (socket) => {
  console.log('Un nuevo cliente se ha conectado')
  const productosBD = await productos.getAll();
  const mensajesBD = await mensajes.getAll();
  socket.emit('mensajes', mensajes)
  socket.emit('productos', productos)

  socket.on('mimensaje', async (data) => {
    const nuevoMensaje = {
      socketid: socket.id,
      email: data.email,
      fyh: data.fyh,
      mensaje: data.mensaje,
    }

    await mensajes.save(nuevoMensaje);
      io.sockets.emit("messages", await mensajes.getAll());
  })

  socket.on('miproducto', async (data) => {
    const nuevoProducto = {
      socketid: socket.id,
      titulo: data.titulo,
      precio: data.precio,
      imagen: data.imagen,
    }

    await productos.save(nuevoProducto);
    io.sockets.emit('productos', await productos.getAll());
  })
})

// get

app.get('/', async (req, res) => {
    const productosBD = await productos.getAll()
    res.render("inicio", {
      productos: productosBD,
    })
})

const PORT = 8080

httpServer.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto ' + PORT)
})
