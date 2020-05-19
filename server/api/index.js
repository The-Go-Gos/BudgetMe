const router = require('express').Router()
module.exports = router

const isLoggedIn = (req, res, next) => {
  const {user} = req
  if (!user) {
    return res.sendStatus(403)
  }
  next()
}

router.use('/users', isLoggedIn, require('./users'))
router.use('/receipts', isLoggedIn, require('./receipts'))
router.use('/finance', isLoggedIn, require('./finance'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
