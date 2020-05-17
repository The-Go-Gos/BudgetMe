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
        <span>
          <Link to="/carema">
            <img src="camera.jpg" height="80px" width="80px" />
          </Link>
        </span>
        <span>
          <Link to="/receiptdetail">
            <img src="upload.png" height="80px" width="80px" />
          </Link>
        </span>
        <span>
          <Link to="/manualreceipt">
            <img src="manual.jpg" height="80px" width="80px" />
          </Link>
        </span>
      </div>
    )
  }
}

export default Receipts
