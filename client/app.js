import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'

class App extends React.Component {
  render() {
    const {isLoggedIn} = this.props

    if (isLoggedIn) {
      return (
        <div>
          <Navbar />
          <Routes />
        </div>
      )
    } else {
      return (
        <div>
          <Routes />
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

// export default App
export default connect(mapState)(App)

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
