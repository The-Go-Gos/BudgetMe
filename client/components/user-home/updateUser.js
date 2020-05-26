import React from 'react'
import {connect} from 'react-redux'
import UpdateUserForm from './updateUserForm'

class UpdateUser extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const {user} = this.props
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: ''
    })
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
  return {id: state.user.id, user: state.user}
}

export default connect(mapState)(UpdateUser)
