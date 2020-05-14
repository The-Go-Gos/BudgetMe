import React from 'react'
import {connect} from 'react-redux'
import {addReceiptThunk, analyzeReceiptThunk} from '../store/receipts'

// const dummy = {
//   vendor: 'whole foods',
//   products: [
//     {
//       name: 'OVF LG EGGS',
//       price: 6.19,
//       categoryId: 1,
//     },
//     {
//       name: 'OG HASS AVOCADO BAG',
//       price: 6.99,
//       categoryId: 1,
//     },
//     {
//       name: 'CRUNCHY ALMD BTR',
//       price: 7.99,
//       categoryId: 1,
//     },
//   ],
//   totalPrice: 21.17,
// }

const categories = [
  'Choose a Category', //category 'other' in db
  'Apparel',
  'Accessaries',
  'Dining Out',
  'Fees & Service Charges',
  'Groceries',
  'Household',
  'Hobbies',
  'Personal Care',
  'Sports',
  'Travel'
]

const defaultState = {
  vendor: '',
  products: [],
  totalPrice: 0
}

class ReceiptDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    // this.analyze = this.analyze.bind(this)
  }

  componentDidMount() {
    const image =
      '/Users/linweiliu/Desktop/BudgetMe/server/googleOcr/crabapple.jpg'
    this.setState(this.props.analyzeReceipt(image))
  }

  //helper functions
  // getVendor = (s) => {
  //   const myRe = /.*\d.*/g
  //   let first3line = s.split('\n').slice(0, 2)
  //   let res = ''
  //   first3line.forEach(line => {
  //     if (!myRe.exec(line)) {
  //       res += line + ' '
  //     }
  //   })
  //   res = res.trim().toUpperCase()
  //   return res
  // }

  // isFloat = x => {
  //   return !!(x % 1)
  // }

  // makeLine = (dict, x, y, part) => {
  //   let range = []
  //   for (let i = y - 20; i < y + 20; i++) {
  //     range.push(i)
  //   }

  //   for (let each of range) {
  //     // ** if on the same line
  //     if (dict.hasOwnProperty(each)) {
  //       if (x > 600) {
  //         dict[each].price += part
  //       } else {
  //         dict[each].name += part
  //       }
  //       return
  //     }
  //   }
  //   // ** if on a different line
  //   if (x > 600) {
  //     dict[y] = {
  //       name: '',
  //       price: part
  //     }
  //   } else {
  //     dict[y] = {
  //       name: part,
  //       price: ''
  //     }
  //   }
  // }

  // analyze(image) {
  //   const parsed = this.props.analyzeReceipt(image)
  //   let document = parsed.fullTextAnnotation
  //   //get vendor name
  //   let vendorStr = document.text
  //   let vendor = this.getVendor(vendorStr)
  //   // get products array
  //   let blocks = document.pages[0].blocks
  //   let dictionary = {}
  //   for (let block of blocks) {
  //     block.paragraphs.forEach(paragraph =>
  //       paragraph.words.forEach(word => {
  //         let x = word.boundingBox.vertices[0].x
  //         let y = word.boundingBox.vertices[0].y
  //         let part = word.symbols.map(symbol => symbol.text).join('')
  //         if (part !== '$') this.makeLine(dictionary, x, y, part)
  //       })
  //     )
  //   }
  //   let products = []
  //   let totalPrice
  //   for (let itemKey in dictionary) {
  //     let item = dictionary[itemKey]
  //     if (
  //       item.price &&
  //       !isNaN(item.price) &&
  //       this.isFloat(item.price) &&
  //       !item.name.toLowerCase().includes('total') &&
  //       !item.name.toLowerCase().includes('due')
  //     ) {
  //       item.price = item.price[0] === '$' ? item.price.slice(1) : item.price
  //       item.categoryId = 1
  //       products.push(item)
  //     }
  //     //get total price
  //     if (
  //       item.price &&
  //       !isNaN(item.price) &&
  //       this.isFloat(item.price) &&
  //       (item.name.toLowerCase().includes('total') ||
  //         item.name.toLowerCase().includes('due'))
  //     ) {
  //       totalPrice = item.price[0] === '$' ? item.price.slice(1) : item.price
  //     }
  //   }
  //   let receiptDetails = {
  //     vendor: vendor,
  //     products: products,
  //     totalPrice: totalPrice
  //   }
  //   // return receiptDetails
  //   this.setState({receiptDetails})
  // }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleNameChange(e) {
    const newProducts = [...this.state.products]
    const index = parseInt(e.target.id)
    newProducts[index].name = e.target.value
    this.setState({
      products: newProducts
    })
  }

  handlePriceChange(e) {
    const newProducts = [...this.state.products]
    const index = parseInt(e.target.id)
    newProducts[index].price = e.target.value
    this.setState({
      products: newProducts
    })
  }

  handleCategoryChange(e) {
    const newProducts = [...this.state.products]
    const index = parseInt(e.target.id)
    newProducts[index].categoryId = parseInt(e.target.value)
    this.setState({
      products: newProducts
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.addReceipt(this.state)
    this.setState(defaultState)
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div>
            <label htmlFor="vendor"> Vendor: </label>
            <input
              onChange={e => this.handleChange(e)}
              name="vendor"
              type="text"
              value={this.state.vendor}
            />
          </div>

          <div>
            {this.state.products.map((list, index) => {
              return (
                <div key={index}>
                  <label htmlFor="name"> Name: </label>
                  <input
                    onChange={e => this.handleNameChange(e)}
                    name="name"
                    type="text"
                    id={index}
                    value={list.name}
                  />

                  <label htmlFor="price"> Price: </label>
                  <input
                    onChange={e => this.handlePriceChange(e)}
                    name="price"
                    type="number"
                    id={index}
                    value={list.price}
                  />

                  <select
                    id={index}
                    onChange={e => this.handleCategoryChange(e)}
                  >
                    {categories.map((c, optionIndex) => {
                      return (
                        <option key={optionIndex} value={optionIndex + 1}>
                          {c}
                        </option>
                      )
                    })}
                  </select>
                </div>
              )
            })}
          </div>
          <div>
            <label htmlFor="totalPrice"> Total Price: </label>
            <input
              onChange={e => this.handleChange(e)}
              name="totalPrice"
              type="number"
              value={this.state.totalPrice}
            />
          </div>
          <br />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  addReceipt: receipt => dispatch(addReceiptThunk(receipt)),
  analyzeReceipt: receipt => dispatch(analyzeReceiptThunk(receipt))
})

export default connect(null, mapDispatch)(ReceiptDetail)
