// Create a class User

class User {
  //Class constructor
  constructor(firstName, lastName, books, pets) {
    this.firstName = firstName
    this.lastName = lastName
    this.books = books
    this.pets = pets
  }

  //Return firstName + lastName
  getFullName() {
    console.log(`${this.firstName} ${this.lastName}`)
  }

  //Add one pet to the pets array
  addPet(name) {
    this.pets.push(name)
  }

  //Return the number of pets
  countPets() {
    console.log(this.pets.length)
  }

  //Add one book to the books array
  addBook(name, author) {
    this.books.push({ name: name, author: author })
  }

  //Return the names of the books in the array, we use map to get a new array with only the names
  getBookNames() {
    let bookNames = this.books.map((book) => book.name)
    console.log(bookNames)
  }
}

//We make an instance of the User class
const gabriel = new User(
  'Gabriel',
  'Ramirez',
  [
    { name: 'Sherlock Holmes', author: 'Sir Arthur' },
    { name: 'Life of dogs', author: 'Jhon Dog Lover' },
  ],
  ['Luna', 'Loki'],
)

//Call the return methods to check the values of the new object
gabriel.getFullName()
gabriel.getBookNames()
gabriel.countPets()

//We add data to the arrays using the class methods
gabriel.addPet('Lia')
gabriel.addBook('Fast and Furious', 'Toreto')

//We check again the new values of the arrays
gabriel.getBookNames()
gabriel.countPets()
