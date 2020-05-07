const Sequelize = require('sequelize')
const db = require('../db')

const Receipt = db.define('receipt', {
  vendor: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now(),
  },
  totalPrice: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0,
      isDecimal: true,
    },
  },
})

module.exports = Receipt