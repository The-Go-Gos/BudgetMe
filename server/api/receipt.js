const router = require('express').Router()
const {Receipt} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const receipts = await Receipt.findAll()
    res.json(receipts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const {params} = req
  try {
    const receipt = await Receipt.findOne({
      where: {
        id: params.id
      }
    })
    res.json(receipt)
  } catch (err) {
    next(err)
  }
})
