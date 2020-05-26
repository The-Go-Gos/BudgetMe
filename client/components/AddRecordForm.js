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
    this.addProduct = this.addProduct.bind(this)
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
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="control ">
              <label className="label">Vendor</label>
              <input
                className="input is-success is-small is-rounded"
                type="text"
                name="vendor"
                value={vendor}
                onChange={this.handleChange}
                id="aligned-name"
                placeholder="Name"
              />
              <p className="help is-success">This is a required field</p>
            </div>

            <div className="control">
              <label className="label">Total Price</label>
              <input
                className="input is-success is-small is-rounded"
                type="number"
                step="any"
                name="totalPrice"
                value={totalPrice}
                onChange={this.handleChange}
                id="aligned-name"
                placeholder="0"
              />
              <p className="help is-success">This is a required field</p>
            </div>
          </div>
          <div>
            <ProductInputs
              products={products}
              onChangeHandler={this.handleChange}
            />
          </div>
          <br />
          <button className="button is-success">
            <span className="icon is-small">
              <i className="fas fa-check" />
            </span>
            <span>Save</span>
          </button>
        </form>
        <br />
        <div>
          <button
            className="button is-warning is-light"
            onClick={this.addProduct}
          >
            <span className="icon is-small">
              <i className="fas fa-plus" />
            </span>
            <span>Add New Item</span>
          </button>
        </div>
      </div>
    )
  }
}
const mapDispatch = dispatch => ({
  addReceipt: receipt => dispatch(addReceiptThunk(receipt))
})

export default connect(null, mapDispatch)(withToast(AddRecordForm))
