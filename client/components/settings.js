import React from 'react'
import {connect} from 'react-redux'
import AddBudgetForm from './budgetForm'
import UpdateBudgetForm from './user-home/updateBudgetForm'
import {getTotalThunk} from '../store'

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
  componentDidMount() {
    const {id} = this.props
    this.props.getTotal(id)
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
    const {total} = this.props

    if (!total.totalBudget) {
      return (
        <div>
          <h1 className="has-text-centered has-background-grey-light is-size-5">
            Budget
          </h1>
          <AddBudgetForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            state={this.state}
            userId={id}
          />
        </div>
      )
    } else {
      return (
        <div>
          <h1 className="has-text-centered has-background-grey-light is-size-5">
            Budget
          </h1>
          <UpdateBudgetForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            state={this.state}
            userId={id}
          />
        </div>
      )
    }
  }
}

const mapState = state => {
  return {id: state.user.id, total: state.budgetReducer.Total}
}

const mapDispatch = dispatch => {
  return {
    getTotal: id => dispatch(getTotalThunk(id))
  }
}
// export default Setting
export default connect(mapState, mapDispatch)(Setting)
