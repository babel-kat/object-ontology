import {
  FILTER,
  HOVER_FILTER
} from '../actions/ActionTypes'

export function filters (state = {}, action) {
  const { payload, type } = action
  switch (type) {
    case FILTER:
      return {...payload}

    default:
      return state
  }
}

export function hoverFilters (state = {}, action) {
  const { payload, type } = action
  switch (type) {
    case HOVER_FILTER:
      return {...payload}

    default:
      return state
  }
}
