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
        <Link to="/carema">
          <img src="camera-icon.png" height="100px" width="90px" />
        </Link>
        <br />
        <Link to="/receiptdetail">
          <img src="upload-icon.jpg" height="100px" width="100px" />
        </Link>
        <br />
        <Link to="/manualreceipt">
          <img src="keyboard-icon.jpg" height="100px" width="100px" />
        </Link>
      </div>
    )
  }
}

export default Receipts
