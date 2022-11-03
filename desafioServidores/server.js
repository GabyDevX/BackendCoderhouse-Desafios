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
      return 'The file does not exist or contains invalid data'
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

const products = new Container('products')

const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send(
    'Please go to /productos to get a list of products or /productoRandom to get a random product',
  )
})

app.get('/productos', async (req, res) => {
  const data = await products.getAll()
  res.send(`${JSON.stringify(data)}`)
})

app.get('/productoRandom', async (req, res) => {
  const data = await products.getAll()
  const randomId = parseInt(Math.floor(Math.random() * data.length + 1))
  const product = await products.getById(randomId)
  res.send(`${JSON.stringify(product)}`)
})

const PORT = 8080

const server = app.listen(PORT, () => {
  console.log('Servidor iniciado')
})

server.on('error', (err) => {
  console.log('hubo un error: ' + err)
})
