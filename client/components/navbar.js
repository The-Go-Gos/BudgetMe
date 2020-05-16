import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, openNav, closeNav}) => {
  return (
    <div>
      <nav className="navbar is-info">
        {isLoggedIn && (
          <div>
            <div id="burger">
              <div id="mySidenav" className="sidenav">
                <a href="#" className="closebtn" onClick={closeNav}>
                  &times;
                </a>
                <a href="/receipts">Receipts</a>
                <a href="/spendDash">SpenDash</a>
                <a href="/settings">Settings</a>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
              <span className="is-size-5" onClick={openNav}>
                &#9776;
              </span>
            </div>
          </div>
        )}
        <div id="user">
          <span className="icon">
            <i className="fas fa-lg fa-user-circle" />
          </span>
        </div>
      </nav>
    </div>
  )
}

{
  /* <span className="icon">
            <i className="fas fa-user-circle"></i>
          </span> */
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    openNav() {
      document.getElementById('mySidenav').style.width = '50%'
    },
    closeNav() {
      document.getElementById('mySidenav').style.width = '0'
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

/*
 <nav>
      {isLoggedIn && (
        <div>
            <Link to="/receipts">Receipts</Link>
            <Link to="/spendDash">SpenDash</Link>
            <Link to="/settings">Settings</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            </div>
      )}
    </nav>
    <hr />

    */
