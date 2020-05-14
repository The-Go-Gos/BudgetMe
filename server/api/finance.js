const router = require('express').Router()
const {Finance} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const finance = await Finance.findAll()
    res.json(finance)
  } catch (err) {
    next(err)
  }
})
