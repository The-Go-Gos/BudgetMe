import axios from 'axios'
import history from '../history'

//thunk
export const addBudgetThunk = (userId, budgetElement) => async () => {
  try {
    await axios.post(`/api/users/${userId}/finance`, {
      userId: userId,
      budget: budgetElement,
    })
  } catch (err) {
    console.error(err)
  }
}