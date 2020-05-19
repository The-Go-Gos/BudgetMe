import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getTotalThunk, fetchAllCategories} from '../store'
import Pie from './user-home/pie'
import Message from './user-home/message'
import {Link} from 'react-router-dom'

export class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      vendor: '',
      products: [],
      totalPrice: 0
    }
    // this.handleClick = this.handleClick.bind(this)
  }

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
            In any little way, Save everyday
          </h1>
          <h4 className="has-text-centered  is-size-5">Welcome, {email}</h4>
          <h5>You have not recorded any budget at the moment </h5>
          <div>
            <article className="tile is-child box">
              <div className="buttons level-item">
                <img
                  src="addReceipt.jpeg"
                  width="96"
                  height="96"
                  align="center"
                />
                <button className="button is-rounded is-success">
                  <Link to="/receipts">
                    <strong className="has-text-warning">
                      Start Uploading Your First Receipt
                    </strong>
                  </Link>
                </button>
              </div>
              <div className="buttons level-item">
                <img src="setting.jpg" width="96" height="96" align="center" />
                <button className="button is-rounded is-info">
                  <Link to="/settings">
                    <strong className="has-text-warning">
                      Start Setting Your Monthly Budget
                    </strong>
                  </Link>
                </button>
              </div>
            </article>
          </div>
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
