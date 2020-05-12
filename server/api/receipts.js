const router = require('express').Router()
const {Receipt, Product} = require('../db/models')
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

router.post('/', async (req, res, next) => {
  const {vendor, products, totalPrice} = req.body
  console.log(req.body)
  try {
    const [newReceipt] = await Receipt.findOrCreate({
      where: {
        userId: req.user.id,
        vendor: vendor,
        totalPrice: totalPrice
      },
      include: [{model: Product}]
    })
    await newReceipt.addProducts(products)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
