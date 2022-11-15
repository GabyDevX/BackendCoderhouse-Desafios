//SERVIDOR EXPRESS
const express = require('express')
const { Router } = express

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('public'))

const router = new Router()

productos = []

//GET
router.get('/', (req, res) => {
  res.json(productos)
})

//GET /:id
//SI NO EXISTE {error: 'producto no encontrado'}
router.get('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  const item = productos.find((el) => el.id === Number(id)) || null
  item != null ? res.json(item) : res.json({ error: 'producto no encontrado' })
})

//POST
router.post('/', (req, res) => {
  const newProduct = req.body
  const ids = productos.map((el) => el.id)
  const lastId = Math.max(...ids)
  newProduct.id = lastId === -Infinity ? 1 : lastId + 1
  productos.push(newProduct)
  res.json({ ok: 'ok' })
})

// PUT /:id
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const newPersona = req.body
  newPersona.id = id
  const item = productos.find((el) => el.id === id) || null
  if (item != null) {
    const index = productos.indexOf(item)
    productos[index] = newPersona
    res.json({ ok: 'ok' })
  } else {
    res.json({ error: 'producto no encontrado' })
  }
})

// DELETE /:id
router.delete('/:id', (req, res) => {
  const id = req.params.id
  const newProducts = productos.filter((p) => p.id !== Number(id))
  productos = newProducts
  res.json({ ok: 'ok' })
})

app.use('/api/productos', router)

const PORT = 8080

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`),
)
