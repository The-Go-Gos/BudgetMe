const vision = require('@google-cloud/vision')
const resizeOptimizeImages = require('resize-optimize-images')

const client = new vision.ImageAnnotatorClient()
const imagePath = '/Users/linweiliu/Desktop/my-app/receipts/disney.jpeg'

const resize = async () => {
  const options = {
    images: [imagePath],
    width: 900,
    quality: 100
  }
  await resizeOptimizeImages(options)
}

async function readReceipt(receipt) {
  const [parsed] = await client.documentTextDetection(receipt)
  let document = parsed.fullTextAnnotation
  //get vendor name
  let vendorStr = document.text
  let vendor = getVendor(vendorStr)
  // get products array
  let blocks = document.pages[0].blocks
  let dictionary = {}
  for (let block of blocks) {
    block.paragraphs.forEach(paragraph =>
      paragraph.words.forEach(word => {
        let x = word.boundingBox.vertices[0].x
        let y = word.boundingBox.vertices[0].y
        let part = word.symbols.map(symbol => symbol.text).join('')
        if (part !== '$') makeLine(dictionary, x, y, part)
      })
    )
  }
  let products = []
  let totalPrice
  for (let itemKey in dictionary) {
    let item = dictionary[itemKey]
    if (
      item.price &&
      !isNaN(item.price) &&
      isFloat(item.price) &&
      !item.name.toLowerCase().includes('total') &&
      !item.name.toLowerCase().includes('due')
    ) {
      item.price = item.price[0] === '$' ? item.price.slice(1) : item.price
      item.categoryId = 1
      products.push(item)
    }
    //get total price
    if (
      item.price &&
      !isNaN(item.price) &&
      isFloat(item.price) &&
      (item.name.toLowerCase().includes('total') ||
        item.name.toLowerCase().includes('due'))
    ) {
      totalPrice = item.price[0] === '$' ? item.price.slice(1) : item.price
    }
  }
  let receiptDetails = {
    vendor: vendor,
    products: products,
    totalPrice: totalPrice
  }
  return receiptDetails
}

async function runReadReceipt(image) {
  await resize()
  const res = await readReceipt(image)
  console.log(res)
}

runReadReceipt(imagePath)

//helper functions
function getVendor(s) {
  const myRe = /.*\d.*/g
  let first3line = s.split('\n').slice(0, 2)
  let res = ''
  first3line.forEach(line => {
    if (!myRe.exec(line)) {
      res += line + ' '
    }
  })
  res = res.trim().toUpperCase()
  return res
}

const isFloat = x => {
  return !!(x % 1)
}

const makeLine = (dict, x, y, part) => {
  let range = []
  for (let i = y - 20; i < y + 20; i++) {
    range.push(i)
  }

  for (let each of range) {
    // ** if on the same line
    if (dict.hasOwnProperty(each)) {
      if (x > 600) {
        dict[each].price += part
      } else {
        dict[each].name += part
      }
      return
    }
  }
  // ** if on a different line
  if (x > 600) {
    dict[y] = {
      name: '',
      price: part
    }
  } else {
    dict[y] = {
      name: part,
      price: ''
    }
  }
}
