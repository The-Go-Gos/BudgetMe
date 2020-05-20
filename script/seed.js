'use strict'

const db = require('../server/db')
const {
  User,
  Category,
  Product,
  Receipt,
  Finance,
  Tag,
  productTag
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Leslie',
      lastName: 'Knope',
      email: 'leslie@aol.com',
      password: '1234'
    }),
    User.create({
      firstName: 'Andy',
      lastName: 'Dwyer',
      email: 'andy@aol.com',
      password: '1234'
    }),
    User.create({
      firstName: 'Donna',
      lastName: 'Meagle',
      email: 'donna@aol.com',
      password: '1234'
    }),
    User.create({
      firstName: 'Ron',
      lastName: 'Swanson',
      email: 'ron@aol.com',
      password: '1234'
    })
  ])

  const categories = await Promise.all([
    Category.create({id: 1, title: 'Other'}),
    Category.create({id: 2, title: 'Food & Dining'}),
    Category.create({id: 3, title: 'Shopping'}),
    Category.create({id: 4, title: 'Home'}),
    Category.create({id: 5, title: 'Auto & Transport'}),
    Category.create({id: 6, title: 'Health & Fitness'}),
    Category.create({id: 7, title: 'Pets'}),
    Category.create({id: 8, title: 'Travel'}),
    Category.create({id: 9, title: 'Fees & Charges'})
  ])

  const receipts = await Promise.all([
    Receipt.create({
      vendor: 'Bluebell Cafe',
      totalPrice: 16.0,
      userId: 1
    }),
    Receipt.create({
      vendor: 'Kroger',
      totalPrice: 11.5,
      userId: 2
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Waffles',
      price: 7.0,
      receiptId: 1,
      categoryId: 4
    }),
    Product.create({
      name: 'Coffee',
      price: 1.5,
      receiptId: 1,
      categoryId: 4
    }),
    Product.create({
      name: 'Tax',
      price: 5.95,
      receiptId: 1,
      categoryId: 8
    }),
    Product.create({
      name: 'Tip',
      price: 1.55,
      receiptId: 1,
      categoryId: 8
    }),
    Product.create({
      name: 'Butter',
      price: 5.0,
      receiptId: 2,
      categoryId: 3
    }),
    Product.create({
      name: 'Eggs',
      price: 2.0,
      receiptId: 2,
      categoryId: 3
    }),
    Product.create({
      name: 'Milk',
      price: 1.5,
      receiptId: 2,
      categoryId: 3
    }),
    Product.create({
      name: 'Bread',
      price: 1.5,
      receiptId: 2,
      categoryId: 3
    }),
    Product.create({
      name: 'Grapes',
      price: 1.5,
      receiptId: 2,
      categoryId: 3
    })
  ])

  const finance = await Promise.all([
    Finance.create({
      budget: 40000,
      userId: 1
    }),
    Finance.create({
      budget: 20000,
      userId: 2
    }),
    Finance.create({
      budget: 30065,
      userId: 3
    }),
    Finance.create({
      budget: 50000,
      userId: 4
    })
  ])

  const tag = await Promise.all([
    Tag.create({
      tagName: 'dairy'
    })
  ])

  const productTags = await Promise.all([
    productTag.create({
      productId: 5,
      tagId: 1
    }),
    productTag.create({
      productId: 7,
      tagId: 1
    })
  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${receipts.length} receipts`)
  console.log(`seeded ${finance.length} finance`)
  console.log(`seeded ${tag.length} tag`)
  console.log(`seeded ${productTags.length} productTags`)
}
// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
