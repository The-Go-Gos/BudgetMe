import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import receiptReducer from './receipt'
import categoryReducer from './category'
import budgetReducer from './budget'
import allReceiptsReducer from './allReceipts'

const reducer = combineReducers({
  user,
  receiptReducer,
  categoryReducer,
  budgetReducer,
  allReceiptsReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './category'
export * from './budget'
