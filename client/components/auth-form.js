import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, authSignup} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props
  if (name === 'signup') {
    return (
      <div className='mobile'>
        <h1>BudgetMe</h1>
        <div id="logo">
          <img
            src="https://is3-ssl.mzstatic.com/image/thumb/Purple114/v4/95/87/1a/95871a38-02a6-567b-4899-a15c64d6ff52/source/512x512bb.jpg"
            height="150px"
            width="150px"
          />
          <h1>Sign up</h1>
        </div>
        <div className="input_container mobile">
          <form onSubmit={handleSubmit} name={name}>
            <div className="mobile field">
              <label className="mobile label" htmlFor="firstName">
                <small>First Name</small>
              </label>
              <div className=" mobile control">
                <input
                  className="mobile input"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="mobile field">
              <label className="mobile label" htmlFor="lastName">
                <small>Last name</small>
              </label>
              <div className="mobile control">
                <input
                  className="mobile input"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="mobile field">
              <label className="label" htmlFor="email">
                <small>Email</small>
              </label>
              <div className="mobile control has-icons-left has-icons-right">
                <input
                  className="mobile input"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <span className="mobile icon is-small is-left">
                  <i className="mobile fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div className="mobile field">
              
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <div className="mobile control has-icons-left has-icons-right">
                <input
                  className="mobile input"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <span className="mobile icon is-small is-left">
                  <i className="mobile fas fa-lock"></i>
                </span>
                </div>
              
            </div>
            <div className="mobile field">
              <p className="mobile control">
                <button className="mobile button is-success" type="submit">
                  {displayName}
                </button>
              </p>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <a href="/auth/google">{displayName} with Google</a>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <h1>BudgetMe</h1>
        <div id="logo">
          <img
            src="https://is3-ssl.mzstatic.com/image/thumb/Purple114/v4/95/87/1a/95871a38-02a6-567b-4899-a15c64d6ff52/source/512x512bb.jpg"
            height="150px"
            width="150px"
          />
          <h1>Log in</h1>
        </div>
        <div className="input_container">
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>
            <div>
              <button type="submit">{displayName}</button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <a href="/auth/google">{displayName} with Google</a>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    },
  }
}

const mapDispatchSignUp = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      dispatch(authSignup(firstName, lastName, email, password, formName))
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatchSignUp)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
