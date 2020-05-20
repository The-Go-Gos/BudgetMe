import React from 'react'
import {connect} from 'react-redux'
import {analyzeReceiptThunk} from '../store/receipt'
import {addReceiptThunk} from '../store/allReceipts'
import {Redirect} from 'react-router'
import {useToasts} from 'react-toast-notifications'

function withToast(Component) {
  return function WrappedComponent(props) {
    const toastFuncs = useToasts()
    return <Component {...props} {...toastFuncs} />
  }
}

const categories = [
  'Choose a Category',
  'Food & Dining',
  'Shopping',
  'Home',
  'Auto & Transport',
  'Health & Fitness',
  'Pets',
  'Travel',
  'Fees & Charges'
]

const defaultState = {
  vendor: '',
  products: [],
  totalPrice: 0
}

class ReceiptDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      vendor: '',
      products: [],
      totalPrice: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleAllCategoryChange = this.handleAllCategoryChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidUpdate(preProps) {
    if (
      this.props.receipt.products !== undefined &&
      this.props.receipt !== preProps.receipt
    ) {
      this.setState(this.props.receipt)
    }
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

  handleRemove(e, index) {
    e.preventDefault()
    const newProducts = [...this.state.products]
    newProducts.splice(index, 1)
    this.setState({
      products: newProducts
    })
  }

  handleAllCategoryChange(e) {
    const newProducts = [...this.state.products]
    newProducts.forEach(item => {
      item.categoryId = parseInt(e.target.value)
    })
    this.setState({
      products: newProducts
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    let newReceipt = {
      vendor: this.state.vendor,
      products: this.state.products,
      totalPrice: this.state.totalPrice
    }
    this.props.addReceipt(newReceipt)

    this.props.addToast('Successfully Added Receipt!', {appearance: 'success'})
    this.setState({...defaultState, redirect: true})
  }

  handleUpload(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader()
      reader.onload = e => {
        this.setState({image: e.target.result})
      }
      reader.readAsDataURL(event.target.files[0])
    }

    let image = event.target.files[0]
    let form = new FormData()
    form.append('image', image)
    this.props.analyzeReceipt(form)
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/receipts" />
    }
    return (
      <div>
        <img id="target" src={this.state.image} />

        {this.props.receipt.error ? (
          <div>
            <p>{this.props.receipt.error}</p>
          </div>
        ) : (
          <div />
        )}
        <br />
        {!this.props.receipt.products ||
        this.props.receipt.products.length === 0 ||
        !this.state.vendor ? (
          <div>
            <br />
            <br />
            <input
              id="chooseFile"
              className="button is-success is-rounded has-text-warning"
              type="file"
              onChange={this.handleUpload}
            />
          </div>
        ) : (
          <div>
            <form onSubmit={e => this.handleSubmit(e)}>
              <div className="field">
                <div className="control">
                  <label className="label is-info">Vendor</label>
                  <input
                    className="input is-info "
                    onChange={e => this.handleChange(e)}
                    name="vendor"
                    type="text"
                    value={this.state.vendor}
                  />
                </div>
              </div>
              <br />
              <div className="control">
                <div className="select is-info ">
                  <select onChange={e => this.handleAllCategoryChange(e)}>
                    {categories.map((c, optionIndex) => {
                      return (
                        <option key={optionIndex} value={optionIndex + 1}>
                          {c}
                        </option>
                      )
                    })}
                  </select>
                  <p className="help">
                    You can select a category for all items
                  </p>
                </div>
              </div>

              <div className="item-map">
                {this.state.products.map((list, index) => {
                  return (
                    <div className="block" key={index}>
                      <span className="tag is-success">
                        Item {index + 1}
                        <button
                          className="delete is-small"
                          onClick={e => this.handleRemove(e, index)}
                        />
                      </span>

                      <div className="columns is-gapless is-mobile">
                        <div className="column is-two-fifths">
                          <div className="control">
                            <label className="label is-small">Name</label>
                            <input
                              onChange={e => this.handleNameChange(e)}
                              name="name"
                              type="text"
                              id={index}
                              value={list.name}
                              className="input is-success is-small"
                              placeholder="e.g Organic Bananas"
                            />
                          </div>
                        </div>

                        <div className="column">
                          <div className="control">
                            <label className="label is-small">Price</label>
                            <input
                              onChange={e => this.handlePriceChange(e)}
                              name="price"
                              type="number"
                              step="any"
                              id={index}
                              value={list.price}
                              className="input is-success is-small"
                              placeholder="e.g. 3.96"
                            />
                          </div>
                        </div>

                        <div className="column is-two-fifths">
                          <div className="control">
                            <label className="label is-small">Categoty</label>
                            <select
                              id={index}
                              onChange={e => this.handleCategoryChange(e)}
                              value={list.categoryId}
                              className="input is-warning is-small is-focused"
                            >
                              {categories.map((c, optionIndex) => {
                                return (
                                  <option
                                    key={optionIndex}
                                    value={optionIndex + 1}
                                  >
                                    {c}
                                  </option>
                                )
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div>
                <div className="field">
                  <label className="label is-small">Total Price</label>
                  <div className="control">
                    <input
                      onChange={e => this.handleChange(e)}
                      name="totalPrice"
                      type="number"
                      step="any"
                      value={this.state.totalPrice}
                      className="input is-primary is-small"
                      placeholder="e.g 52.30"
                    />
                  </div>
                </div>
              </div>
              <br />
              <div>
                <button className="button is-success is-right">
                  <span className="icon is-small">
                    <i className="fas fa-check" />
                  </span>
                  <span>Confirm</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    receipt: state.receiptReducer
  }
}

const mapDispatch = dispatch => ({
  addReceipt: receipt => dispatch(addReceiptThunk(receipt)),
  analyzeReceipt: receipt => dispatch(analyzeReceiptThunk(receipt))
})

// export default connect(mapState, mapDispatch)(ReceiptDetail)
export default connect(mapState, mapDispatch)(withToast(ReceiptDetail))
