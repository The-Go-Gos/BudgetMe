import axios from 'axios'

//action type
const ADD_PRODUCT = 'ADD_PRODUCT'

//initial state
const initialProducts = {}

//action creator

const addedProduct = products => ({
  type: ADD_PRODUCT,
  products
})

//thunk
export const addNewProduct = productInfo => async dispatch => {
  try {
    const res = await axios.post('/api/products', productInfo)
    dispatch(addedProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}

//reducer
export default function productsReducer(state = initialProducts, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return action.products

    default:
      return state
  }
}
