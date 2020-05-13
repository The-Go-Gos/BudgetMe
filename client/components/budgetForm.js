import React from 'react'
import {connect} from 'react-redux'
import {addBudgetThunk} from '../store/budget'

const AddBudgetForm = props => {
    const {state, handleChange, handleSubmit} = props
  
    const onSubmit = async e => {
      e.preventDefault()
      const budget = e.target.budget.value
      const budgetElement = {budget}

      const userId = this.props.userId

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
            type="text"
            pattern="[0-9]*"
            title="i.e. 50 = $50"
            value={state.budget}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={
              isNaN(state.budget) ||
              !state.budget }>
            Submit
          </button>
        </div>
      </form>
    )
  }
  
  const mapState = (state) => {
    return {userId: state.user.id}
  }

  const mapDispatch = (dispatch) => {
    return {
        addBudget: (userId, budgetElement) =>
        dispatch(addBudgetThunk(userId, budgetElement)),
    }
  }
  
  export default connect(mapState, mapDispatch)(AddBudgetForm)

  /* type="number" 
            min="0.00" 
            max="10000.00" 
            step="0.01"  */