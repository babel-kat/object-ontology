import {
  OPEN_CHAIR,
  CLOSE_CHAIR
} from '../actions/ActionTypes'

export default function chairs (state = {}, action) {
  const { payload, type } = action
  switch (type) {
    case OPEN_CHAIR:
      return {open: true, chair: payload}
    case CLOSE_CHAIR:
      return {open: false, chair: payload}

    default:
      return state
  }
}
