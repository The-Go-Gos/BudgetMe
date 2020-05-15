import React from 'react'
import {Link} from 'react-router-dom'

class StartHome extends React.Component {
  render() {
    return (
        
        <div className=" square tile is-parent">
            <figure className="logo image is-128x128">
          <img
            className='is-rounded'
            src="https://is3-ssl.mzstatic.com/image/thumb/Purple114/v4/95/87/1a/95871a38-02a6-567b-4899-a15c64d6ff52/source/512x512bb.jpg"
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
