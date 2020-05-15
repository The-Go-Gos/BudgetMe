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
      <div>
        <div id="logo">
          <img
            src="https://is3-ssl.mzstatic.com/image/thumb/Purple114/v4/95/87/1a/95871a38-02a6-567b-4899-a15c64d6ff52/source/512x512bb.jpg"
            height="150px"
            width="150px"
          />
        </div>
        <div className="input_container">
          <form onSubmit={handleSubmit} name={name}>
            <div className="field">
              <label className="label" htmlFor="firstName">
                <small>First Name</small>
              </label>
              <div className="control">
                <input
                  className="input"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="lastName">
                <small>Last name</small>
              </label>
              <div className="control">
                <input
                  className="input"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="email">
                <small>Email</small>
              </label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div className="field">
              
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
                </div>
              
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success" type="submit">
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
        <div id="logo">
          <img
            src="https://is3-ssl.mzstatic.com/image/thumb/Purple114/v4/95/87/1a/95871a38-02a6-567b-4899-a15c64d6ff52/source/512x512bb.jpg"
            height="150px"
            width="150px"
          />
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
