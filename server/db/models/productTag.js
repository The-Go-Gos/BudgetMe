const Sequelize = require('sequelize')
const db = require('../db')

const productTag = db.define('productTag', {})

module.exports = productTag
