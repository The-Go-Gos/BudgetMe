import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getTotalThunk, fetchAllCategories} from '../store'
import Pie from './user-home/pie'
import Message from './user-home/message'

export class UserHome extends React.Component {
  componentDidMount() {
    const {id} = this.props
    this.props.getTotal(id)
    this.props.getCategories(id)
  }

  render() {
    const {email} = this.props
    const {percentageNotSpent, percentageSpent, totalSpend} = this.props.total
    const {categories} = this.props.categories

    const largest = Math.max(...categories.map(e => e.value.totalSpent))
    const thisObjs = categories.map(category => {
      if (category.value.totalSpent === largest) {
        return category.key
      }
    })

    return (
      <div>
        <h1 className="has-text-centered has-background-grey-light is-size-5">
          Home
        </h1>
        <h4 className="has-text-centered  is-size-5">Welcome, {email}</h4>
        {percentageSpent === null || percentageNotSpent === null ? (
          <div>
            <br />
            <h5 className="has-text-centered">
              You have not recorded any budget at the moment <br />
              You have to set up a budget and then start adding recipts to see
              results
            </h5>
            <br />
            <div className="grid-container">
              <p className="grid-child bgtSetup control">
                <button className="button is-success">
                  <a href="/settings">
                    <span className="icon">
                      <i className="fas fa-edit" />
                    </span>
                    <span>&nbsp;</span>Set Up Budget
                  </a>
                </button>
              </p>
              <p className="grid-child control">
                <button className="button is-warning">
                  <a href="/receipts">
                    <span className="icon">
                      <i className="fas fa-folder-plus" />
                    </span>
                    <span>&nbsp;</span>Add Receipts
                  </a>
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div>
            <Pie
              percentageNotSpent={percentageNotSpent}
              percentageSpent={percentageSpent}
            />
            {categories.length === 0 ? (
              <div>
                <h5 className="has-text-centered">
                  You have not set up any spending records, <br /> click the
                  botton below to start recording
                </h5>
                <p className="rctAdd control">
                  <button className="button is-warning">
                    <a href="/receipts">
                      <span className="icon">
                        <i className="fas fa-folder-plus" />
                      </span>
                      <span>&nbsp;</span>Add Receipts
                    </a>
                  </button>
                </p>
              </div>
            ) : (
              <Message totalSpend={totalSpend} categorySpend={thisObjs} />
            )}
          </div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    id: state.user.id,
    email: state.user.email,
    total: state.budgetReducer.Total,
    categories: state.categoryReducer
  }
}

const mapDispatch = dispatch => {
  return {
    getTotal: id => dispatch(getTotalThunk(id)),
    getCategories: userId => dispatch(fetchAllCategories(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
