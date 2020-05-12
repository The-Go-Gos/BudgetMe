const router = require('express').Router()
const {Product, Receipt, Category} = require('../db/models')

// router.get('/', async (req, res, next) => {
//   try {
//     const products = await Product.findAll()
//     res.json(products)
//   } catch (err) {
//     next(err)
//   }
// })

// router.post('/', async (req, res, next) => {
//   try {
//     const recentReceipt = await Receipt.create(req.user.id)
//     const [product] = await Product.create(
//       {
//         where: {
//           receiptId: recentReceipt[0].dataValues.id
//         },
//         include: [{model: Category}]
//       },
//       req.body
//     )
//     // await product.create(req.body);
//     // const products = await Product.findAll()
//     // res.json(products)
//   } catch (err) {
//     next(err)
//   }
// })

// router.put('/:productId', isAdmin, async (req, res, next) => {
//   try {
//     const updatedProduct = await Product.update(req.body, {
//       where: {
//         id: req.params.productId
//       }
//     })
//     res.status(201).json(updatedProduct)
//   } catch (err) {
//     next(err)
//   }
// })

// router.delete('/:productId', isAdmin, async (req, res, next) => {
//   try {
//     await Product.destroy({
//       where: {
//         id: req.params.productId
//       }
//     })
//     const products = await Product.findAll()
//     res.status(201).json(products)
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
