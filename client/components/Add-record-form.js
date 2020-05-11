import React from 'react'
import {connect} from 'react-redux'
import {addNewProduct} from '../store/products'

const defaultState = {
  name: '',
  price: 0,
  category: ''
}

export class AddProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: 0,
      category: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    const productInfo = {
      name: this.state.name,
      price: this.state.price,
      category: this.state.category
    }

    this.props.addProduct(productInfo)
    this.setState(defaultState)
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)} className="form">
          <label htmlFor="name"> Name: </label>
          <input
            onChange={e => this.handleChange(e)}
            name="name"
            type="text"
            value={this.state.name}
          />

          <label htmlFor="price"> Price: </label>
          <input
            onChange={e => this.handleChange(e)}
            name="price"
            type="number"
            value={this.state.price}
          />

          <select>
            <option value="1" hidden>
              Select Category
            </option>
            <option value="2">Grocery</option>
            <option value="3">Sports</option>
            <option value="4">Education</option>
            <option value="5">Pets</option>
            <option value="6">Gas</option>
          </select>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

// const mapState = (state) => ({
//   products: state.products,
// })

const mapDispatch = dispatch => ({
  addProduct: productInfo => dispatch(addNewProduct(productInfo))
})

export default connect(null, mapDispatch)(AddProductForm)
