const router = require('express').Router()
const {User, Product} = require('../db/models')
module.exports = router

/*  const isAdmin = (req, res, next) => {
  const {user} = req
  if (!user || !user.isAdmin) {
    const err = new Error("You're not an admin!")
    err.status = 401
    return next(err)
  }
  next()
}
*/

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'firstName', 'lastName', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/:categoryId', async (req, res, next) => {
  try {
    const {userId, categoryId} = req.params
    const categoryTotal = await Product.categoryTotal(userId, categoryId)
    res.json(categoryTotal)
  } catch (error) {
    next(error)
  }
})
