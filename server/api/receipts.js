const router = require('express').Router()
const {Receipt, Product} = require('../db/models')
const vision = require('@google-cloud/vision')
const readReceipt = require('./anaysis')
const multer = require('multer')
const path = require('path')
const sharp = require('sharp')
const {uuid: uuidv4} = require('uuidv4')
const upload = multer({})

const client = new vision.ImageAnnotatorClient({
  keyFilename: 'budgetMe-0e9157b3d18d.json'
})

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const receipts = await Receipt.findAll({
      where: {
        userId: req.user.id
      }
    })
    res.json(receipts)
  } catch (err) {
    next(err)
  }
})

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

class Resize {
  constructor(folder) {
    this.folder = folder
  }
  async save(buffer) {
    const filename = Resize.filename()
    const filepath = this.filepath(filename)

    await sharp(buffer)
      .resize({width: 900})
      .toFile(filepath)

    return filename
  }
  static filename() {
    return `${uuidv4()}.png`
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}

router.post('/google', upload.single('image'), async (req, res, next) => {
  try {
    const imagePath = path.join(__dirname, '/image')
    const fileUpload = new Resize(imagePath)
    if (!req.file) {
      res.status(401).json({error: 'Please provide an image'})
    }
    const filename = await fileUpload.save(req.file.buffer)
    const [parsed] = await client.documentTextDetection(
      `${imagePath}/${filename}`
    )
    const result = readReceipt(parsed)
    res.json(result)
  } catch (err) {
    console.error(err)
    next()
  }
})
