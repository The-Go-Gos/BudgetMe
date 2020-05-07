const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  totalSpent: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0,
      isDecimal: true,
    },
  }
})

module.exports = Category