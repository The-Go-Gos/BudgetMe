import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'
import StartHome from './components/auth-form/startHome'
import {Link} from 'react-router-dom'
import {Login, Signup} from './components'

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

// const App =()=>{
//   return(<div>
//     <Navbar />
//     <Routes />
//   </div>)
// }
/*<div>
      <Navbar />
      <Routes />
    </div> */

// export default App
