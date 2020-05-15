const router = require('express').Router()
const {Receipt, Product} = require('../db/models')
const vision = require('@google-cloud/vision')
const resizeOptimizeImages = require('resize-optimize-images')
const readReceipt = require('./anaysis')

const client = new vision.ImageAnnotatorClient({
  keyFilename: '/mnt/c/Users/Naomi Moreira/Desktop/GraceHopper/SeniorPhase/projects/quiz/quiz/read-image-276618-b1b87960fbb9.json'
})

module.exports = router

// router.get('/', async (req, res, next) => {
//   try {
//     const receipts = await Receipt.findAll()
//     res.json(receipts)
//   } catch (err) {
//     next(err)
//   }
// })

// router.get('/:id', async (req, res, next) => {
//   const {params} = req
//   try {
//     const receipt = await Receipt.findOne({
//       where: {
//         id: params.id
//       }
//     })
//     res.json(receipt)
//   } catch (err) {
//     next(err)
//   }
// })

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

const resize = async image => {
  const options = {
    images: [image],
    width: 900,
    quality: 100
  }
  await resizeOptimizeImages(options)
}

router.post('/google', async (req, res, next) => {
  // const buffer = Buffer.from(req.body.image, "base64");
  const imagePath = req.body.url
  try {
    await resize(imagePath)
    const [parsed] = await client.documentTextDetection(imagePath)
    const result = readReceipt(parsed)
    res.json(result)
  } catch (err) {
    console.error(err)
    next()
  }
})
