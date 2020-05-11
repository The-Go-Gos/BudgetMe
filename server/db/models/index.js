const User = require('./user')
const Product = require('./product')
const Receipt = require('./receipt')
const Category = require('./category')
const Tag = require('./tag')
const Finance = require('./finance')
const productTag = require('./productTag')
User.hasMany(Receipt)
Receipt.belongsTo(User)

Receipt.hasMany(Product)
Product.belongsTo(Receipt)

Category.hasMany(Product)
Product.belongsTo(Category)

Tag.belongsToMany(Product,  {through: productTag})
Product.belongsToMany(Tag,  {through: productTag})
//include tags and many to many/through table here

User.hasOne(Finance)
Finance.belongsTo(User)

module.exports = {
  User,
  Product,
  Receipt,
  Category,
  Finance,
  Tag,
  productTag
}
