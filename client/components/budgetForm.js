import React from 'react'
import {connect} from 'react-redux'
import {addBudgetThunk} from '../store/budget'

const AddBudgetForm = props => {
  const {state, handleChange, handleSubmit, userId} = props

  const onSubmit = async e => {
    e.preventDefault()
    const budget = e.target.budget.value * 100
    const budgetElement = {budget}
    await props.addBudget(userId, budgetElement)

    handleSubmit()
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="budget">
          <small>Budget</small>
        </label>
        <input
          onChange={handleChange}
          name="budget"
          type="number"
          pattern="[0-9]*[.]?[0-9]+"
          step="0.01"
          title="i.e. 100.56 = $100.56"
          value={state.budget}
        />
      </div>
      <div>
        <button type="submit" disabled={isNaN(state.budget) || !state.budget}>
          Submit
        </button>
      </div>
    </form>
  )
}

const mapDispatch = dispatch => {
  return {
    addBudget: (userId, budgetElement) =>
      dispatch(addBudgetThunk(userId, budgetElement))
  }
}

export default connect(null, mapDispatch)(AddBudgetForm)
