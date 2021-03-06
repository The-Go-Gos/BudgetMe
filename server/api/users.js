const router = require('express').Router()
const {User, Product, Finance} = require('../db/models')

// const twilio = require("twilio");
// const twilioClient = new twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

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

router.get('/categories/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    const categories = await Product.findAllCategory(userId)
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

router.get('/chart/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    const dataChart = await Product.findChartData(userId)
    res.json(dataChart)
  } catch (error) {
    next(error)
  }
})

router.get('/total/:userId', async (req, res, next) => {
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

router.get('/categories/:categoryId/:userId', async (req, res, next) => {
  try {
    const {userId, categoryId} = req.params
    const categoryTotal = await Product.categoryTotal(userId, categoryId)
    res.json(categoryTotal)
  } catch (error) {
    next(error)
  }
})

router.get('/finance/:userId', async (req, res, next) => {
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

router.post('/finance/:userId', async (req, res, next) => {
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

router.put('/finance/:userId', async (req, res, next) => {
  const {body} = req
  const {userId} = req.params
  try {
    const financeFound = await Finance.findOne({
      where: {
        userId: userId
      }
    })
    if (financeFound) {
      const updatedFinance = await financeFound.update(body)
      res.json(updatedFinance)
    } else {
      res.status(404).json('Not found')
    }
  } catch (error) {
    next(error)
  }
})

// ================ Send

// router.post('/send/:userId', async (req, res, next) => {
//   const {userId} = req.params
//   try {
//   const foundUser = User.findOne({
//    where:{
//     id: userId
//   }
//   })
//   if(foundUser){

//   }else {
//     res.status(404).json('Not found')
//   }
//   } catch (error) {
//     next(error)
//   }
// })
