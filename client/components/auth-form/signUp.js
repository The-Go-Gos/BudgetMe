import React from 'react'
import {Link} from 'react-router-dom'

const SignUp = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className="tile is-parent">
      <article className="logggin tile is-child notification is-success">
        <div className="input_container">
          <form onSubmit={handleSubmit} name={name}>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </p>
            </div>

            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
              </p>
            </div>

            <div className=" field">
              <p className=" control has-icons-left">
                <input
                  className="input"
                  name="password"
                  type="password"
                  placeholder="Password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </p>
            </div>
            <button
              className="button is-fullwidth is-rounded is-warning"
              type="submit"
            >
              {displayName}
            </button>
            {error &&
              error.response && (
                <p className="help has-text-black-bis	is-size-6">
                  {' '}
                  {error.response.data}{' '}
                </p>
              )}
          </form>
          <br />
          <div className=" field">
            <p className="control">
              <button
                type="submit"
                className="button is-fullwidth is-info is-rounded"
              >
                <a href="/auth/google">{displayName} with Google</a>
              </button>
            </p>
          </div>
        </div>
        <br />
        <div className="homeLink field">
          <p className="control">
            <button type="submit" className="button is-white">
              <Link to="/">
                <span className="icon">
                  <i className="fas fa-arrow-left" />
                </span>
              </Link>
            </button>
          </p>
        </div>
      </article>
    </div>
  )
}

export default SignUp
