import React from 'react'
// import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Receipts extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Link to="/receiptdetail">
          <h4>Upload</h4>
        </Link>
        <Link to="/manualreceipt">
          <h4>Manual</h4>
        </Link>
      </div>
    )
  }
}

export default Receipts
