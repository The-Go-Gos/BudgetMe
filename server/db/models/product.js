const Sequelize = require('sequelize')
const db = require('../db')
const Receipt = require('./receipt')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0,
      isDecimal: true
    },
    get() {
      const inDecimal = this.getDataValue('price')
      return inDecimal * 100
    }
  }
})

Product.categoryTotal = async function(userId, categoryId) {
  const products = await this.findAll({
    where: {
      categoryId: categoryId
    },
    include: {
      model: Receipt,
      where: {
        userId: userId
      }
    }
  })
  console.log('products we got from class method: ', products)
  const categoryTotal = products.reduce((acc, cur) => {
    return acc + cur.price
  }, 0)
  return categoryTotal / 100
}

//read from receipt, convert to integer (getter/setter), and have function that converts from pennies when we get it back - beforeSave hook
//Create Tag model with many to many relationship with product, belongsToMany with through table
//normalization: data redundancy - in RD, want to avoid data redundancy - saving things in array - strawberry and apple both red fruits - would repeat data - best to abstract to another table
//non-relational databases don't care - denormalization - power of noSQL is that data redundancy provides more power/flexibility - favors accessibility over DRYness
module.exports = Product
