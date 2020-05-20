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
          <section className="hero is-light">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">Welcome, {email}!</h1>
                <br />
                <h2 className="subtitle">
                  Get Start! You have not recorded any budget at the moment!
                </h2>
              </div>
            </div>
          </section>
          <br />

          <div>
            <article className="tile is-child box">
              <div className="buttons level-item">
                <img
                  src="addReceipt.jpeg"
                  width="64"
                  height="64"
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
              <br />
              <div className="buttons level-item">
                <img src="setting.jpg" width="64" height="64" align="center" />
                <button className="button is-rounded is-success">
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
