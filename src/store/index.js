import { createStore, applyMiddleware } from 'redux'
import { combineReducers, stateTransformer } from 'redux-seamless-immutable'
import promiseMiddleware from 'redux-promise'
import {createLogger} from 'redux-logger'
import * as common from './common'
import * as counter from './counter'

const rootReducer = combineReducers({
  common: common.reducers,
  counter: counter.reducers
})

const loggerMiddleware = createLogger({
  stateTransformer: stateTransformer
})

export default function configStore () {
  const store = createStore(rootReducer, applyMiddleware(loggerMiddleware, promiseMiddleware))
  return store
}

export const actions = {
  ...common.actions, ...counter.actions
}
