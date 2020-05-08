const User = require('./user')
const Product = require('./product')
const Receipt = require('./receipts')
const Category = require('./category')

User.hasMany(Receipt)
Receipt.belongsTo(User)

Receipt.hasMany(Product)
Product.belongsTo(Receipt)

Category.hasMany(Product)
Product.belongsTo(Category)

User.hasMany(Product)
Product.belongsTo(User)

module.exports = {
  User,
  Product,
  Receipt,
  Category
}
