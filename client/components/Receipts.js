import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getReceiptsThunk} from '../store/allReceipts'

class Receipts extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.displayReceipts()
  }

  render() {
    return (
      <div>
        <div className="flex">
          <Link to="/receiptdetail">
            <img src="add.png" height="60px" width="60px" />
          </Link>
          <Link to="/manualreceipt">
            <img src="manual.jpg" height="60px" width="60px" />
          </Link>
        </div>
        <br />
        <br />
        <div>
          {this.props.receipts.map(receipt => {
            return (
              <div key={receipt.id}>
                <li className="flex">
                  <h6>{receipt.vendor}</h6>
                  <h6>${receipt.totalPrice / 100}</h6>
                  <h6>{receipt.date.slice(0, 10)}</h6>
                </li>
                <br />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    receipts: state.allReceiptsReducer
  }
}

const mapDispatch = dispatch => {
  return {
    displayReceipts: () => dispatch(getReceiptsThunk())
  }
}

export default connect(mapState, mapDispatch)(Receipts)
