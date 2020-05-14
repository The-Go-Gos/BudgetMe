const Sequelize = require('sequelize')
const db = require('../db')

const Finance = db.define('finance', {
  budget: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      isDecimal: false
    },
    get() {
      const inPennies = this.getDataValue('budget')
      return inPennies / 100
    }
  }
})

Finance.findAllFinance = async function(userId) {
  const finance = await this.findOne({
    where: {
      userId: userId
    }
  })

  return finance
}

module.exports = Finance
