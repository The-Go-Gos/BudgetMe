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
    const {total} = this.props
    const {categories} = this.props.categories

    if (total.percentageSpent === null || total.percentageNotSpent === null) {
      return (
        <div>
          <h1 className="has-text-centered has-background-grey-light is-size-5">
            Home
          </h1>
          <h4 className="has-text-centered  is-size-5">Welcome, {email}</h4>
          <h5>You have not recorded any budget at the moment </h5>
        </div>
      )
    } else {
      return (
        <div>
          <h1 className="has-text-centered has-background-grey-light is-size-5">
            Home
          </h1>
          <Pie
            email={email}
            percentageNotSpent={total.percentageNotSpent}
            percentageSpent={total.percentageSpent}
          />
          <Message totalSpend={total.totalSpend} categories={categories} />
        </div>
      )
    }
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
