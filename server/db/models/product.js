const Sequelize = require('sequelize')
const db = require('../db')

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
    }
  }
})
//read from receipt, convert to integer (getter/setter), and have function that converts from pennies when we get it back - beforeSave hook
//Create Tag model with many to many relationship with product, belongsToMany with through table
//normalization: data redundancy - in RD, want to avoid data redundancy - saving things in array - strawberry and apple both red fruits - would repeat data - best to abstract to another table
//non-relational databases don't care - denormalization - power of noSQL is that data redundancy provides more power/flexibility - favors accessibility over DRYness
module.exports = Product
