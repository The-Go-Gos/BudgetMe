import React from 'react'
import {connect} from 'react-redux'
import {addReceiptThunk} from '../store/receipts'

// parsed from google OCR
const dummy = {
  vendor: 'whole foods',
  products: [
    {
      name: 'OVF LG EGGS',
      price: 6.19,
      categoryId: 9
    },
    {
      name: 'OG HASS AVOCADO BAG',
      price: 6.99,
      categoryId: 9
    },
    {
      name: 'CRUNCHY ALMD BTR',
      price: 7.99,
      categoryId: 9
    }
  ],
  totalPrice: 21.17
}

const categories = [
  'Select Category',
  'Clothing',
  'Shoes',
  'Groceries',
  'Dining Out',
  'Crafts and Hobbies',
  'Travel',
  'Sports and Athletics',
  'Fees and Service Charges'
]

const defaultState = {
  vendor: '',
  products: [],
  totalPrice: 0
}

class ReceiptDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = dummy

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
  }

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
                        <option key={optionIndex} value={optionIndex}>
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
  addReceipt: receipt => dispatch(addReceiptThunk(receipt))
})

export default connect(null, mapDispatch)(ReceiptDetail)
