const Sequelize = require('sequelize')
const db = require('../db')

const Finance = db.define('finance', {
  budget: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      isDecimal: false
    }
  }
})

module.exports = Finance
