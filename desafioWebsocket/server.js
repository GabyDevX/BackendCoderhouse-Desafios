//FILE MANAGMENT
const fs = require('fs')

class Container {
  constructor(name) {
    this.name = name
  }

  async save(obj) {
    try {
      const newObject = obj
      newObject.id = 1
      //If the file doesn't exist, this take the execution to the catch'
      let info = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
      if (info !== '') {
        info = JSON.parse(info)
        const ids = info.map((el) => el.id)
        const lastId = Math.max(...ids)
        newObject.id = lastId === -Infinity ? 1 : lastId + 1
      } else {
        info = []
      }
      info.push(newObject)
      await fs.promises.writeFile(
        `./${this.name}.txt`,
        JSON.stringify(info, null, 2),
      )
      return newObject.id
    } catch (error) {
      const newObject = obj
      newObject.id = 1
      await fs.promises.writeFile(
        `./${this.name}.txt`,
        JSON.stringify([newObject], null, 2),
      )
      return newObject.id
    }
  }

  async getById(id) {
    try {
      //If the file doesn't exist, this take the execution to the catch'
      let info = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
      if (info !== '') {
        info = JSON.parse(info)
        const item = info.find((el) => el.id === id) || null
        return item
        // !== null ? item : 'The object does not exist'
      } else {
        return 'The file is empty'
      }
    } catch (error) {
      return 'The file does not exist'
    }
  }

  async getAll() {
    try {
      //If the file doesn't exist, this take the execution to the catch'
      let info = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
      if (info !== '') {
        return JSON.parse(info)
      } else {
        return 'The file is empty'
      }
    } catch (error) {
      //   return 'The file does not exist or contains invalid data'
      await fs.promises.writeFile(
        `./${this.name}.txt`,
        JSON.stringify([], null, 2),
      )
    }
  }

  async deleteById(id) {
    try {
      //If the file doesn't exist, this take the execution to the catch'
      let info = await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
      if (info !== '') {
        info = JSON.parse(info)
        if (info.find((el) => el.id === id) === undefined) {
          console.log(`The object with the id: ${id}, doesn't exist`)
          return
        }
        const newList = info.filter((el) => el.id !== id)
        await fs.promises.writeFile(
          `./${this.name}.txt`,
          JSON.stringify(newList, null, 2),
        )
        console.log(`The object with the id: ${id}, has been deleted`)
      } else {
        console.log('The file is empty')
      }
    } catch (error) {
      console.log('The file does not exist')
    }
  }

  async deleteAll() {
    try {
      //If the file doesn't exist, this take the execution to the catch'
      await fs.promises.readFile(`./${this.name}.txt`)
      await fs.promises.writeFile(`./${this.name}.txt`, '')
      console.log('All the objects have been deleted successfully')
    } catch (error) {
      console.log(`The file with the name: ${this.name}.txt, doesn't exist`)
    }
  }
}

const mensajesArchivo = new Container('mensajesArchivo')
mensajesArchivo.getAll()

const productosArchivo = new Container('productosArchivo')
productosArchivo.getAll()

//SERVER

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

let productos = []
let mensajes = []

const traerMensajes = async () => {
  mensajes = await mensajesArchivo.getAll()
}

const traerProductos = async () => {
  productos = await productosArchivo.getAll()
}

io.on('connection', (socket) => {
  console.log('Un nuevo cliente se ha conectado')
  traerMensajes().then(() => socket.emit('mensajes', mensajes))
  traerProductos().then(() => socket.emit('productos', productos))

  socket.on('mimensaje', (data) => {
    const nuevoMensaje = {
      socketid: socket.id,
      email: data.email,
      fyh: data.fyh,
      mensaje: data.mensaje,
    }

    mensajes.push(nuevoMensaje)

    mensajesArchivo.save(nuevoMensaje)

    io.sockets.emit('mensajes', mensajes)
  })

  socket.on('miproducto', (data) => {
    const nuevoProducto = {
      socketid: socket.id,
      titulo: data.titulo,
      precio: data.precio,
      imagen: data.imagen,
    }

    productos.push(nuevoProducto)

    productosArchivo.save(nuevoProducto)

    io.sockets.emit('productos', productos)
  })
})

// get

app.get('/', (req, res) => {
  res.render('inicio', { mensajes, productos })
})

const PORT = 8080

httpServer.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto ' + PORT)
})
