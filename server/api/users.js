const router = require('express').Router()
const {User, Product, Finance} = require('../db/models')
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

router.get('/:userId', async (req, res, next) => {
  const {userId} = req.params
  try {
    const user = await User.findOne({
      where: {
        id: userId
      },
      attributes: ['id', 'firstName', 'lastName', 'email']
    })
    if (user) {
      res.json(user)
    } else {
      res.status(404).json('User not found')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  const {body, params} = req
  try {
    const user = await User.findOne({
      where: {
        id: params.userId
      }
    })
    if (user) {
      const updatedUser = await user.update(body)
      res.json(updatedUser)
    } else {
      res.status(404).json('User not found')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/categories', async (req, res, next) => {
  try {
    const {userId} = req.params
    const categories = await Product.findAllCategory(userId)
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/total', async (req, res, next) => {
  try {
    const {userId} = req.params
    const total = await Product.findTotal(userId)
    if (total) {
      res.json(total)
    } else {
      res.json('Information not found')
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/categories/:categoryId', async (req, res, next) => {
  try {
    const {userId, categoryId} = req.params
    const categoryTotal = await Product.categoryTotal(userId, categoryId)
    res.json(categoryTotal)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/finance', async (req, res, next) => {
  try {
    const {userId} = req.params
    const finances = await Finance.findAllFinance(userId)
    if (finances) {
      res.json(finances)
    } else {
      res.json('You have not declared a budget, please do so on Settings')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/finance', async (req, res, next) => {
  const {userId} = req.params
  const {body} = req
  try {
    const createdBudget = await Finance.create({
      userId: userId,
      budget: body.budget
    })
    res.json(createdBudget)
  } catch (error) {
    next(error)
  }
})
