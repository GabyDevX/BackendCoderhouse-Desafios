const express = require('express')
const { engine } = require('express-handlebars')
const { Router } = express

const app = express()
const router = new Router()

app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main.handlebars',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  }),
)

app.set('views', './views')
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const productos = []
let ifExpression

// get

router.get('/', (req, res) => {
  ifExpression = productos.length > 0
  res.render('layouts/main', { productos, ifExpression })
})

// get id

router.get('/:id', (req, res) => {
  const id = req.params.id
  const item = productos.find((el) => el.id === Number(id))
  ifExpression = item === undefined ? false : true
  console.log(ifExpression)
  res.render('layouts/main', {
    productos: [item],
    ifExpression,
  })
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
