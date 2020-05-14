import React from 'react'
import {connect} from 'react-redux'
import AddBudgetForm from './budgetForm'

const initState = {
    budget: 0
}

export class Setting extends React.Component {
 constructor(props) {
    super(props)
    this.state = initState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
 }

 handleChange(e) {
  this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit() {
    try {
      this.setState(initState)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const {id} = this.props
    return (
      <div>
      <AddBudgetForm
       handleChange={this.handleChange}
       handleSubmit={this.handleSubmit}
       state={this.state}
       userId={id}
        />
      </div>
    )
  }
}

const mapState = (state) => {
  return {id: state.user.id}
}

// export default Setting
export default connect(mapState)(Setting)
