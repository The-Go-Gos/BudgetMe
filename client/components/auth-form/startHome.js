import React from 'react'
import {Link} from 'react-router-dom'

class StartHome extends React.Component {
  render() {
    return (
      <div className=" square tile is-parent">
        <figure className="logo image is-128x128">
          <img
            className="is-rounded"
            src="https://us.123rf.com/450wm/dacianlogan/dacianlogan1712/dacianlogan171200010/91897814-stock-vector-vector-sales-receipt-icon.jpg?ver=6"
            height="150px"
            width="150px"
          />
        </figure>
        <article className="tile is-child box">
          <div className="buttons level-item">
            <button className="button is-rounded is-info">
              <Link to="/signup">
                <strong>Sign up</strong>
              </Link>
            </button>
          </div>

          <div className="buttons level-item">
            <button className="button is-rounded is-success">
              <Link to="/login">Log in</Link>
            </button>
          </div>
        </article>
      </div>
    )
  }
}

export default StartHome
