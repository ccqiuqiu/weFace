import { handleActions, createActions } from 'redux-actions'
import Immutable from 'seamless-immutable'

// state
const state = Immutable.from({
  num: 0,
  asyncNum: 0,
  a: {b: 1}
})

export const actions = createActions({
  asyncInc: () => new Promise(resolve => {
    setTimeout(() => {
      resolve(2)
    }, 1000)
  })
})

// reducers
export default handleActions({
  increment (state) {
    return Immutable.update(state, 'num', val => val + 1)
  },
  decrement (state) {
    Immutable.update(state, 'num', val => val - 1)
  },
  asyncInc (state, action) {
    return Immutable.update(state, 'asyncNum', val => val + action.payload)
  }
}, state)
