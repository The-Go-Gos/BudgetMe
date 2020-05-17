const Sequelize = require('sequelize')
const db = require('../db')
const d3 = require('d3')
const Receipt = require('./receipt')
const Category = require('./category')
const Finance = require('./finance')

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
    include: [
      {
        model: Receipt,
        where: {
          userId: userId
        }
      },
      {
        model: Category,
        attributes: ['title']
      }
    ]
  })
  const categoryName = products[0].category.title

  const categoryTotal = products.reduce((acc, cur) => {
    return acc + cur.price
  }, 0)
  const category = {}
  category[categoryName] = categoryTotal / 100
  return category
}

Product.findAllCategory = async function(userId) {
  const categories = await this.findAll({
    include: [
      {
        model: Receipt,
        where: {
          userId: userId
        }
      },
      {
        model: Category,
        attributes: ['id', 'title']
      }
    ]
  })

  const expense = d3
    .nest()
    .key(function(d) {
      return d.category.title
    })
    .rollup(function(v) {
      return {
        quantity: v.length,
        totalSpent: d3.sum(v, function(d) {
          return d.price / 100
        }),
        averageSpent: d3.mean(v, function(d) {
          return d.price / 100
        })
      }
    })
    .entries(categories)

  return expense
}

Product.findTotal = async function(userId) {
  const categories = await this.findAll({
    include: [
      {
        model: Receipt,
        where: {
          userId: userId
        }
      },
      {
        model: Category,
        attributes: ['id', 'title']
      }
    ]
  })

  const budget = await Finance.findAllFinance(userId)

  const expense = d3
    .nest()
    .rollup(function(v) {
      return {
        total: d3.sum(v, function(d) {
          return d.price / 100
        })
      }
    })
    .entries(categories)
  const totalBudget = budget.budget
  const total = expense.total
  const percentageSpent = total * 100 / totalBudget
  const percentageNotSpent = 100 - percentageSpent

  const calculations = {}
  calculations.totalSpend = total
  calculations.totalBudget = totalBudget
  calculations.percentageSpent = Math.round(percentageSpent)
  calculations.percentageNotSpent = Math.round(percentageNotSpent)

  return calculations
}

//read from receipt, convert to integer (getter/setter), and have function that converts from pennies when we get it back - beforeSave hook
//Create Tag model with many to many relationship with product, belongsToMany with through table
//normalization: data redundancy - in RD, want to avoid data redundancy - saving things in array - strawberry and apple both red fruits - would repeat data - best to abstract to another table
//non-relational databases don't care - denormalization - power of noSQL is that data redundancy provides more power/flexibility - favors accessibility over DRYness
module.exports = Product
