import React from 'react'
import {connect} from 'react-redux'
import {useToasts} from 'react-toast-notifications'
import {updateBudgetThunk} from '../../store/budget'

const UpdateBudgetForm = props => {
  const {state, handleChange, userId} = props
  const {addToast} = useToasts()

  const onSubmit = async e => {
    e.preventDefault()
    const budget = e.target.budget.value * 100
    const budgetElement = {budget}
    await props.updateBudget(userId, budgetElement)

    addToast('Successfully Updated Budget!', {appearance: 'success'})
  }
  const {totalBudget} = props.total

  return (
    <div>
      <div className="tile is-parent">
        <article className="tile is-child notification is-success">
          <form onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="budget" className="label">
                Update Budget
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
                    <i className="fas fa-edit" />
                  </span>
                  <span>&nbsp;</span>
                  Submit
                </button>
              </p>
            </div>
          </form>
        </article>
      </div>
      <div className="notification is-success is-light has-text-centered">
        {state.budget === 0 ? (
          <h1 className="is-size-3">
            Current Budget:
            <br /> ${totalBudget}{' '}
          </h1>
        ) : (
          <h1 className="is-size-3">
            Current Updated Budget:
            <br /> ${state.budget}{' '}
          </h1>
        )}
      </div>
    </div>
  )
}

const mapState = state => {
  return {total: state.budgetReducer.Total}
}
const mapDispatch = dispatch => {
  return {
    updateBudget: (userId, budgetElement) =>
      dispatch(updateBudgetThunk(userId, budgetElement))
  }
}

export default connect(mapState, mapDispatch)(UpdateBudgetForm)
