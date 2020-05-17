import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, openNav, closeNav}) => {
  return (
    <div>
      <nav id="sticky" className="navbar is-info">
        {isLoggedIn && (
          <div>
            <div id="burger">
              <div id="mySidenav" className="sidenav">
                <a
                  href="#"
                  className="has-text-white closebtn"
                  onClick={closeNav}
                >
                  &times;
                </a>
                <aside className="menu">
                  <ul className="menu-list">
                    <li>
                      <a href="/receipts" className="has-background-white">
                        &#x1F4C3; Receipts
                      </a>
                    </li>
                    <li>
                      <a href="/spendDash" className="has-background-white">
                        &#x1F4D1; SpenDash
                      </a>
                    </li>
                    <li>
                      <a href="/settings" className="has-background-white">
                        &#x1F4B2; Budget
                      </a>
                    </li>
                    <hr />
                    <li>
                      <a
                        href="#"
                        onClick={handleClick}
                        className="has-text-white has-background-success"
                      >
                        <span className="icon">
                          <i className="fas fa-sign-out-alt" />
                        </span>
                        <strong>Logout</strong>
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>
              <span className="is-size-5" onClick={openNav}>
                &#9776;
              </span>
            </div>
          </div>
        )}
        <div id="user">
          <span className="icon has-text-white">
            <a href="/view" className="has-text-white">
              <i className="fas fa-lg fa-user-circle" />
            </a>
          </span>
        </div>
      </nav>
    </div>
  )
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
