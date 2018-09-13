import { createStore, applyMiddleware } from 'redux'
import { combineReducers, stateTransformer } from 'redux-seamless-immutable'
import promiseMiddleware from 'redux-promise'
import {createLogger} from 'redux-logger'
import counter from './counter'

const rootReducer = combineReducers({
  counter
})

const loggerMiddleware = createLogger({
  stateTransformer: stateTransformer
})

export default function configStore () {
  const store = createStore(rootReducer, applyMiddleware(loggerMiddleware, promiseMiddleware))
  return store
}
