import axios from 'axios'

//// ACTION TYPE

// const GET_BUDGET = 'GET_BUDGET'
const GET_TOTAL = 'GET_TOTAL'

const defaultState = {
  Total: {}
}

const getTotal = total => ({
  type: GET_TOTAL,
  total
})

//thunk
export const addBudgetThunk = (userId, budgetElement) => async () => {
  try {
    await axios.post(`/api/users/${userId}/finance`, budgetElement)
  } catch (err) {
    console.error(err)
  }
}

export const updateBudgetThunk = (userId, budgetElement) => async () => {
  try {
    await axios.put(`/api/users/${userId}/finance`, budgetElement)
  } catch (err) {
    console.error(err)
  }
}

export const getTotalThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/total`)
    dispatch(getTotal(data))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function budgetReducer(state = defaultState, action) {
  switch (action.type) {
    // case GET_BUDGET:
    //   return {...state, Budget: action.budget}
    case GET_TOTAL:
      return {...state, Total: action.total}
    default:
      return state
  }
}
