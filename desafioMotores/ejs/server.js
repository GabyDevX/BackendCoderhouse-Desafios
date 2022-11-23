const express = require('express')
const { Router } = express

const app = express()
const router = new Router()
const productos = [
//   {
//   titulo: 'Instagram',
//   precio: '10000',
//   imagen: 'https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-1024.png', 
//   id: 1
// }
]

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')

// get

router.get('/', (req, res) => {
  res.render('inicio', { productos })
})

// get id

router.get('/:id', (req, res) => {
  const id = req.params.id
  const item = productos.find((el) => el.id === Number(id))
  console.log(item)
  res.render('inicio', { productos: item === undefined ? [] : [item] })
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
