import React from 'react'
import {connect} from 'react-redux'
import UpdateUserForm from './updateUserForm'

const initState = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

class UpdateUser extends React.Component {
  constructor() {
    super()
    this.state = initState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit() {
    this.setState(initState)
  }

  render() {
    const {id} = this.props
    return (
      <div>
        <UpdateUserForm
          userId={id}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          state={this.state}
        />
      </div>
    )
  }
}

const mapState = state => {
  return {id: state.user.id}
}

export default connect(mapState)(UpdateUser)
