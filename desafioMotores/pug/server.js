const express = require('express')
const { Router } = express

const app = express()
const router = new Router()
const productos = []

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'pug')
app.set('views', './views')

// get

router.get('/', (req, res) => {
  res.render('inicio', { productos })
})

// get id

router.get('/:id', (req, res) => {
  const id = req.params.id
  const item = productos.find((el) => el.id === Number(id))
  res.render('inicio', { productos: productos === undefined ? [] : [item] })
})

// post

router.post('/', (req, res) => {
  const newProduct = req.body
  const ids = productos.map((el) => el.id)
  const lastId = Math.max(...ids)
  newProduct.id = lastId === -Infinity ? 1 : lastId + 1
  productos.push(newProduct)
  res.redirect('/api/productos')
})

app.use('/api/productos', router)

const PORT = 8080
app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`)
})
