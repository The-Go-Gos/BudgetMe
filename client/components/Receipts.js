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
          <Link to="/carema">
            <img src="camera.jpg" height="80px" width="80px" />
          </Link>
          <Link to="/receiptdetail">
            <img src="upload.png" height="80px" width="80px" />
          </Link>
          <Link to="/manualreceipt">
            <img src="manual.jpg" height="80px" width="80px" />
          </Link>
        </div>
        <br />
        <br />
        <div className="flex">
          {this.props.receipts.map(receipt => {
            return (
              <div key={receipt.id}>
                <img src="receipt logo.jpg" height="60px" width="60px" />
                <h5>{receipt.vendor}</h5>
                <h6>${receipt.totalPrice / 100}</h6>
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
