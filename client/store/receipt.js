import axios from 'axios'

//action type
const ANALYZE_RECEIPT = 'ANALYZE_RECEIPT'
const GET_SINGLE_RECEIPT = 'GET_SINGLE_RECEIPT'

//initial state
const initialState = {}

const analyzeReceipt = receipt => ({
  type: ANALYZE_RECEIPT,
  receipt
})

const getSingleReceipt = receipt => ({
  type: GET_SINGLE_RECEIPT,
  receipt
})

export const analyzeReceiptThunk = formData => async dispatch => {
  try {
    const res = await axios.post('/api/receipts/google', formData)
    dispatch(analyzeReceipt(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const getSingleReceiptThunk = id => async dispatch => {
  try {
    const res = await axios.get(`/api/receipts/${id}`)
    dispatch(getSingleReceipt(res.data))
  } catch (error) {
    console.error(error)
  }
}

//reducer
export default function receiptReducer(state = initialState, action) {
  switch (action.type) {
    case ANALYZE_RECEIPT:
      return action.receipt
    case GET_SINGLE_RECEIPT:
      return action.receipt
    default:
      return state
  }
}
