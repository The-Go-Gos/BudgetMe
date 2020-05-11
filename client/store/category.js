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

const fetchAllcategories = (userId) => {


}