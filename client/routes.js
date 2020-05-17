import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  SpenDash,
  Setting,
  StartHome,
  ViewUser,
  EditUser
} from './components'
import {me} from './store'
import ReceiptDetail from './components/ReceiptDetails'
import AddRecordForm from './components/AddRecordForm'
import Receipts from './components/Receipts'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={StartHome} />

        {isLoggedIn && (
          <Switch>
            <Route path="/home" component={UserHome} />
            <Route
              exact
              path="/spendDash"
              render={routeProps => <SpenDash {...routeProps} />}
            />
            <Route exact path="/settings" component={Setting} />
            <Route exact path="/receiptdetail" component={ReceiptDetail} />
            <Route exact path="/manualreceipt" component={AddRecordForm} />
            <Route exact path="/view" component={ViewUser} />
            <Route exact path="/update" component={EditUser} />
            <Route exact path="/receipts" component={Receipts} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
