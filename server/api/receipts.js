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
  try {
    const receipt = await Receipt.create({
      userId: req.user.id,
      vendor: vendor,
      totalPrice: totalPrice,
      include: [{model: Product}]
    })

    // await Product.destroy({
    //   where: { receiptId: receipt.id }
    // })

    for (let i = 0; i < products.length; i++) {
      const product = await Product.create({
        name: products[i].name,
        price: products[i].price,
        receiptId: receipt.id,
        categoryId: products[i].categoryId
      })
      await receipt.addProduct(product)
    }

    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
