import axios from 'axios'
import history from '../history'

// ACTION TYPE

const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES"

const defaultState = {
    categories: []
}

//Action creator
const getAllCategories = categories => ({type: GET_ALL_CATEGORIES, categories})

//thunk

export const fetchAllCategories = (userId) => async dispatch => {
    try {
        const {data} = await axios.get(`/api/users/${userId}/categories`)
        console.log('thunk data: ', data)
        dispatch(getAllCategories(data))
    } catch (error) {
        console.error(error)
    }
}

//reducer
export default function categoryReducer (state = defaultState, action) {
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return {...state, categories: action.categories}
        default:
            return state
    }
}
