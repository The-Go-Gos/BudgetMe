const vision = require('@google-cloud/vision')
const client = new vision.ImageAnnotatorClient()

const fileName = '/Users/linweiliu/Desktop/my-app/receipts/traderJoes.jpg'

async function test() {
  const [parsed] = await client.documentTextDetection(fileName)
  let document = parsed.fullTextAnnotation
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

  for (let itemKey in dictionary) {
    let item = dictionary[itemKey]
    if (
      item.price &&
      !isNaN(item.price) &&
      isFloat(item.price) &&
      !item.name.toLowerCase().includes('total')
    ) {
      item.price = item.price[0] === '$' ? item.price.slice(1) : item.price
      item.categoryId = 1
      console.log('@@@@', item)
    }
  }
}

test()

function isFloat(x) {
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
