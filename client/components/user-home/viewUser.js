import React from 'react'
import {connect} from 'react-redux'
import {me, getTotalThunk} from '../../store'
import {Link} from 'react-router-dom'

export class ViewUser extends React.Component {
  componentDidMount() {
    const {id} = this.props.user
    this.props.getTotal(id)
    this.props.getUser()
  }
  render() {
    const {user} = this.props
    const {totalBudget} = this.props.total
    if (!user) {
      return <h1>You have nothing to show</h1>
    } else {
      return (
        <div className="tile is-parent">
          <article className="tile is-child notification is-warning">
            <h3>Name: {user.firstName}</h3>
            <h3>Last Name: {user.lastName}</h3>
            <h3>Email: {user.email}</h3>
            {totalBudget ? (
              <h3>Current Budget: ${totalBudget} </h3>
            ) : (
              <div>
                <h3> You have not set up a budget </h3>
                <div className="homeLink field">
                  <br />
                  <p className="control">
                    <button className="button is-success">
                      <a href="/settings">
                        <span className="icon">
                          <i className="fas fa-edit" />
                        </span>
                        <span>&nbsp;</span>Set Up Budget
                      </a>
                    </button>
                  </p>
                </div>
              </div>
            )}
            <br />
            <div className="homeLink field">
              <p className="control">
                <button className="button is-white">
                  <a href="/update" className="linked">
                    <span className="icon">
                      <i className="fas fa-edit" />
                    </span>
                    <span>&nbsp;</span>
                    Update Information
                  </a>
                </button>
              </p>
            </div>
          </article>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {user: state.user, total: state.budgetReducer.Total}
}

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me()),
  getTotal: id => dispatch(getTotalThunk(id))
})

export default connect(mapState, mapDispatch)(ViewUser)
