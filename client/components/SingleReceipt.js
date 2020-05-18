import React from 'react'
import {connect} from 'react-redux'
import {getSingleReceiptThunk} from '../store/receipt'

class SingleReceipt extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const receiptId = this.props.match.params.receiptId
    this.props.getSingleReceipt(receiptId)
  }

  render() {
    return (
      <div>
        {this.props.receipt.products &&
          this.props.receipt.products.map(product => {
            return (
              <ul key={product.id}>
                <li>{product.name}</li>
                <li>${product.price / 100}</li>
              </ul>
            )
          })}
      </div>
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
