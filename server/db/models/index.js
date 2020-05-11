const User = require('./user')
const Product = require('./product')
const Receipt = require('./receipt')
const Category = require('./category')
const Tag = require('./tag')
const Finance = require('./finance')

User.hasMany(Receipt)
Receipt.belongsTo(User)

Receipt.hasMany(Product)
Product.belongsTo(Receipt)

Category.hasMany(Product)
Product.belongsTo(Category)

Tag.belongsToMany(Product)
Product.belongsToMany(Tag)
//include tags and many to many/through table here

User.hasOne(Finance)
Finance.belongsTo(User)

module.exports = {
  User,
  Product,
  Receipt,
  Category,
  Tag
}
