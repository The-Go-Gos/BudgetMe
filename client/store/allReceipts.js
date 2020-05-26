import axios from 'axios'

const GET_RECEIPTS = 'GET_RECEIPTS'

//initial state
const initialState = []

const getReceipts = receipts => ({
  type: GET_RECEIPTS,
  receipts
})

export const getReceiptsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/receipts')
    data.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    dispatch(getReceipts(data))
  } catch (error) {
    console.error(error)
  }
}

export const addReceiptThunk = receipt => async dispatch => {
  try {
    await axios.post('/api/receipts', receipt)
  } catch (error) {
    console.error(error)
  }
}

export default function allReceiptsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECEIPTS:
      return action.receipts
    default:
      return state
  }
}
