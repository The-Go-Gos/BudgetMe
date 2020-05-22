import React from 'react'
import {connect} from 'react-redux'
import {getSingleReceiptThunk} from '../store/receipt'

class SingleReceipt extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const receiptId = this.props.id
    this.props.getSingleReceipt(receiptId)
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {this.props.receipt.products &&
            this.props.receipt.products.map(product => {
              return (
                <tr key={product.id}>
                  <td align="left">{product.name}</td>
                  <td align="right">${(product.price / 100).toFixed(2)}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    )
  }
}

const mapState = state => {
  return {
    receipt: state.receiptReducer
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleReceipt: id => dispatch(getSingleReceiptThunk(id))
  }
}

export default connect(mapState, mapDispatch)(SingleReceipt)
