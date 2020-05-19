import React from 'react'
import ProductInputs from './ProductInput'
import {connect} from 'react-redux'
import {addReceiptThunk} from '../store/allReceipts'
import {Redirect} from 'react-router'
import {useToasts} from 'react-toast-notifications'

function withToast(Component) {
  return function WrappedComponent(props) {
    const toastFuncs = useToasts()
    return <Component {...props} {...toastFuncs} />
  }
}

const defaultState = {
  vendor: '',
  products: [],
  totalPrice: 0
}

class AddRecordForm extends React.Component {
  constructor() {
    super()
    this.state = {
      vendor: '',
      products: [{name: '', price: 0, categoryId: 1}],
      totalPrice: 0
    }
  }

  handleChange = e => {
    if (['name', 'price', 'categoryId'].includes(e.target.className)) {
      let products = [...this.state.products]
      products[e.target.id][e.target.className] = e.target.value
      this.setState({products})
    } else {
      this.setState({[e.target.name]: e.target.value})
    }
  }
  addProduct = () => {
    this.setState(prevState => ({
      products: [...prevState.products, {name: '', price: 0, categoryId: 1}]
    }))
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.addReceipt(this.state)
    this.props.addToast('Successfully Added Receipt!', {appearance: 'success'})
    this.setState({...defaultState, redirect: true})
  }

  render() {
    let {vendor, products, totalPrice} = this.state
    if (this.state.redirect) {
      return <Redirect push to="/receipts" />
    }
    return (
      <div>
        <button onClick={this.addProduct}>Add another item</button>
        <br />
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="vendor">
              <small>Vendor</small>
            </label>
            <input
              type="text"
              name="vendor"
              value={vendor}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div>
            <ProductInputs
              products={products}
              onChangeHandler={this.handleChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor="totalPrice">
              <small>Total Price</small>
            </label>
            <input
              type="number"
              step="any"
              name="totalPrice"
              value={totalPrice}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
const mapDispatch = dispatch => ({
  addReceipt: receipt => dispatch(addReceiptThunk(receipt))
})

export default connect(null, mapDispatch)(withToast(AddRecordForm))
