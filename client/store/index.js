import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import receiptsReducer from './receipts'
import categoryReducer from './category'
import budgetReducer from './budget'

const reducer = combineReducers({
  user,
  receiptsReducer,
  categoryReducer,
  budgetReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './category'
export * from './budget'