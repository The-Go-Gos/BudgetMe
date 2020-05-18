import React from 'react'
import {connect} from 'react-redux'
import {useToasts} from 'react-toast-notifications'
import {updateBudgetThunk} from '../../store/budget'

const UpdateBudgetForm = props => {
  const {state, handleChange, handleSubmit, userId} = props
  const {addToast} = useToasts()

  const onSubmit = async e => {
    e.preventDefault()
    const budget = e.target.budget.value * 100
    const budgetElement = {budget}
    await props.updateBudget(userId, budgetElement)

    handleSubmit()
    addToast('Successfully Updated Budget!', {appearance: 'success'})
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
          Update Budget
        </button>
      </div>
    </form>
  )
}

const mapDispatch = dispatch => {
  return {
    updateBudget: (userId, budgetElement) =>
      dispatch(updateBudgetThunk(userId, budgetElement))
  }
}

export default connect(null, mapDispatch)(UpdateBudgetForm)
