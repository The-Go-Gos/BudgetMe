import axios from 'axios'

// ACTION TYPE

const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

const defaultState = {
  categories: []
}

//Action creator
const getAllCategories = category => ({
  type: GET_ALL_CATEGORIES,
  category
})

//thunk

export const fetchAllCategories = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/categories`)
    dispatch(getAllCategories(data))
  } catch (error) {
    console.error(error)
  }
}

//reducer
export default function categoryReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {...state, categories: action.category}
    default:
      return state
  }
}
