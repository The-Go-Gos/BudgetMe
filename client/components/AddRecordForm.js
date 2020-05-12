import React from 'react'
import ProductInputs from './ProductInput'
class AddRecordForm extends React.Component {
  constructor() {
    super()
    this.state = {
      vendor: '',
      products: [{name: '', price: 0, categoryId: 0}],
      totalPrice: 0
    }
  }

  handleChange = e => {
    if (['name', 'price'].includes(e.target.className)) {
      let products = [...this.state.products]
      products[e.target.id][e.target.className] = e.target.value
      this.setState({products})
    } else {
      this.setState({[e.target.name]: e.target.value})
    }
  }
  addProduct = e => {
    this.setState(prevState => ({
      products: [...prevState.products, {name: '', price: '', categoryId: 0}]
    }))
  }
  handleSubmit = e => {
    e.preventDefault()
  }

  render() {
    let {vendor, products, totalPrice} = this.state
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <label htmlFor="vendor">Vendor</label>
        <input type="text" name="vendor" value={vendor} />
        <label htmlFor="totalPrice">totalPrice</label>
        <input type="number" name="totalPrice" value={totalPrice} />
        <button onClick={this.addProduct}>Add new product</button>
        <ProductInputs products={products} />
        <button type="submit">Submit</button>
      </form>
    )
  }
}
export default AddRecordForm
