import React from 'react'
import {Link} from 'react-router-dom'

const LogIn = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className="tile is-parent">
      <article className="logggin tile is-child notification is-info">
        <div className="input_container">
          <form onSubmit={handleSubmit} name={name}>
            <div className="input-responsive">
              <div className=" field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-hovered"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope" />
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check" />
                  </span>
                </p>
              </div>
              <div className="input-responsive field">
                <p className="control has-icons-left">
                  <input
                    className="input is-hovered"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock" />
                  </span>
                </p>
                <br />
              </div>
            </div>
            <button
              type="submit"
              className="button is-fullwidth is-rounded is-warning"
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
                className="button is-fullwidth is-success is-rounded"
              >
                <a href="/auth/google">{displayName} with Google</a>
              </button>
            </p>
          </div>
        </div>
        <br />

        <div className="homeLink field">
          <p className="control">
            <button type="submit" className="button is-primary">
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

export default LogIn
