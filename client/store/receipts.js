import axios from 'axios'

//action type
const ADD_RECEIPT = 'ADD_RECEIPT'

//initial state
const initialState = []

//action creator

const addReceipt = receipt => ({
  type: ADD_RECEIPT,
  receipt
})

//thunk
export const addReceiptThunk = receipt => async dispatch => {
  try {
    const res = await axios.post('/api/receipts', receipt)
    dispatch(addReceipt(res.data))
  } catch (error) {
    console.error(error)
  }
}

//reducer
export default function receiptsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_RECEIPT:
      return [...state, action.receipt]

    default:
      return state
  }
}
