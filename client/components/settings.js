import React from 'react'
import AddBudgetForm from './budgetForm'

const initState = {
    budget: ''
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
    return (
      <div>
      <AddBudgetForm
       handleChange={this.handleChange}
       handleSubmit={this.handleSubmit}
       state={this.state}
        />
      </div>
    )
  }
}


export default Setting