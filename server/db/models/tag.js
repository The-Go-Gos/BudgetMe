const Sequelize = require('sequelize')
const db = require('../db')

const Tag = db.define('tag', {
  tagName: {
    type: Sequelize.STRING
  }
})

module.exports = Tag
