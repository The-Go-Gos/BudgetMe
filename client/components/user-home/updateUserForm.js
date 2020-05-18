import React from 'react'
import {connect} from 'react-redux'
import {useToasts} from 'react-toast-notifications'
import {updateUserThunk} from '../../store/user'

const UpdateUserForm = props => {
  const {userId, state, handleChange, handleSubmit, updateUser} = props
  const {addToast} = useToasts()

  const onSubmit = async e => {
    e.preventDefault()
    const {
      id = userId,
      firstName = e.target.firstName.value,
      lastName = e.target.lastName.value,
      email = e.target.email.value,
      password = e.target.password.value
    } = state
    const user = {id, firstName, lastName, email, password}
    await updateUser(user)
    handleSubmit()
    addToast('Successfully updated!', {appearance: 'success'})
  }

  return (
    <div className="tile is-parent">
      <article className="loggginUpdate tile is-child notification is-success">
        <div className="input_container">
          <form onSubmit={onSubmit}>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  onChange={handleChange}
                  value={state.firstName}
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
                  onChange={handleChange}
                  value={state.lastName}
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
                  onChange={handleChange}
                  value={state.email}
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
                  onChange={handleChange}
                  value={state.password}
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
              <br />
            </div>
            <div className="homeLink field">
              <p className="control">
                <button
                  type="submit"
                  className="button is-info"
                  disabled={
                    !state.firstName ||
                    !state.lastName ||
                    !state.email ||
                    !state.password
                  }
                >
                  {' '}
                  Submit{' '}
                </button>
              </p>
            </div>
          </form>
        </div>
        <div className="homeLink field">
          <p className="control">
            <button type="submit" className="button is-white">
              <a href="/view" className="update">
                <span className="icon">
                  <i className="fas fa-arrow-left" />
                </span>
              </a>
            </button>
          </p>
        </div>
      </article>
    </div>
  )
}
const mapDispatch = dispatch => {
  return {
    updateUser: user => dispatch(updateUserThunk(user))
  }
}

export default connect(null, mapDispatch)(UpdateUserForm)
