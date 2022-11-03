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

// Create a new container
const products = new Container('products')

// Create test data
const iphoneX = {
  title: 'Iphone X',
  price: 700,
  thumbnail: 'https://cdn-icons-png.flaticon.com/512/1088/1088537.png',
}
const iphone11 = {
  title: 'Iphone 11',
  price: 800,
  thumbnail: 'https://cdn-icons-png.flaticon.com/512/1088/1088537.png',
}
const iphone12 = {
  title: 'Iphone 12',
  price: 900,
  thumbnail: 'https://cdn-icons-png.flaticon.com/512/1088/1088537.png',
}
const iphone13 = {
  title: 'Iphone 13',
  price: 1000,
  thumbnail: 'https://cdn-icons-png.flaticon.com/512/1088/1088537.png',
}

// // We have created this function to test all the Container class methods,
// // it is an async await function because the methods return promises and we need
// // to wait until the promises are resolved to check the results
// const prueba = async () => {
//   const iphoneXID = await products.save(iphoneX)
//   console.log(iphoneXID)
//   const iphone11ID = await products.save(iphone11)
//   console.log(iphone11ID)
//   const iphone12ID = await products.save(iphone12)
//   console.log(iphone12ID)
//   const iphone13ID = await products.save(iphone13)
//   console.log(iphone13ID)

//   const product2 = await products.getById(2)
//   console.log(product2)

//   const product10 = await products.getById(10)
//   console.log(product10)

//   const allProducts = await products.getAll()
//   console.log(allProducts)

//   await products.deleteById(4)
//   await products.deleteById(12)

//   await products.deleteAll()

//   const allProductsEmpty = await products.getAll()
//   console.log(allProductsEmpty)
// }

// prueba()

export {}