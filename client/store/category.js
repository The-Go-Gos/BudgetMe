import axios from 'axios'

// ACTION TYPE

const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
const GET_DATA = 'GET_DATA'

const defaultState = {
  categories: [],
  graphData: []
}

//Action creator
const getAllCategories = category => ({
  type: GET_ALL_CATEGORIES,
  category
})

const getData = data => ({
  type: GET_DATA,
  data
})

//thunk

export const fetchAllCategories = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/categories/${userId}`)
    dispatch(getAllCategories(data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchData = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/chart/${userId}`)
    dispatch(getData(data))
  } catch (error) {
    console.error(error)
  }
}

//reducer
export default function categoryReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {...state, categories: action.category}
    case GET_DATA:
      return {...state, graphData: action.data}
    default:
      return state
  }
}
