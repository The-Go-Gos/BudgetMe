import axios from 'axios'

//thunk
export const addBudgetThunk = (userId, budgetElement) => async () => {
  try {
    await axios.post(`/api/users/${userId}/finance`, budgetElement)
  } catch (err) {
    console.error(err)
  }
}
