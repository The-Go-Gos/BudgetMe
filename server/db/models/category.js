const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  title: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'Other'
  }
})

module.exports = Category
