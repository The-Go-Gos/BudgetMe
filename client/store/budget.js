import axios from 'axios'
import history from '../history'

//thunk
export const addBudgetThunk = (userId, budgetElement) => async () => {
  try {
    await axios.post(`/api/users/${userId}/finance`, budgetElement)
  } catch (err) {
    console.error(err)
  }
}
