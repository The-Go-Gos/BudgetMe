import React from 'react'
import {connect} from 'react-redux'
import {useToasts} from 'react-toast-notifications'
import {addBudgetThunk} from '../store/budget'

const AddBudgetForm = props => {
  const {state, handleChange, handleSubmit, userId} = props
  const {addToast} = useToasts()

  const onSubmit = async e => {
    // e.preventDefault()
    const budget = e.target.budget.value * 100
    const budgetElement = {budget}
    await props.addBudget(userId, budgetElement)

    handleSubmit()
    addToast(`Successfully added $${state.budget} to your budget!`, {
      appearance: 'success'
    })
  }

  return (
    <div>
      <div className="tile is-parent">
        <article className="tile is-child notification is-info">
          <form onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="budget" className="label">
                Add Budget
              </label>
              <p className="control has-icons-left">
                <input
                  onChange={handleChange}
                  className="input"
                  name="budget"
                  type="number"
                  pattern="[0-9]*[.]?[0-9]+"
                  step="0.01"
                  title="i.e. 100.56 = $100.56"
                  value={state.budget}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-dollar-sign" />
                </span>
              </p>
            </div>
            <div className="homeLink field">
              <p className="control">
                <button
                  type="submit"
                  disabled={isNaN(state.budget) || !state.budget}
                  className="button is-white"
                >
                  <span className="icon">
                    <i className="fa fa-arrow-circle-right" />
                  </span>
                  <span>&nbsp;</span>
                  Submit
                </button>
              </p>
            </div>
          </form>
        </article>
      </div>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    addBudget: (userId, budgetElement) =>
      dispatch(addBudgetThunk(userId, budgetElement))
  }
}

export default connect(null, mapDispatch)(AddBudgetForm)
