const Sequelize = require('sequelize')
const db = require('../db')

const Receipt = db.define('receipt', {
  vendor: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  },
  totalPrice: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0,
      isDecimal: true
    },
    get() {
      const inDecimal = this.getDataValue('totalPrice')
      return inDecimal * 100
    }
  }
})

// Receipt.findByUser = function(userId) {
//   return Receipt.findAll({
//     where: {userId: userId}
//   })
// }

//read from receipt, convert to integer (getter/setter), and have function that converts from pennies when we get it back - beforeSave hook
module.exports = Receipt
