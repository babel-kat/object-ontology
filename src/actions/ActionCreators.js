import {
  OPEN_CHAIR,
  CLOSE_CHAIR,
  FILTER,
  HOVER_FILTER
} from './ActionTypes'

export function openChair (chair = {}) {
  return { type: OPEN_CHAIR, payload: chair }
}

export function closeChair (chair = {}) {
  return { type: CLOSE_CHAIR, payload: chair }
}

export function filter (filter = {}) {
  return { type: FILTER, payload: filter }
}

export function hoverFilter (filter = {}) {
  return { type: HOVER_FILTER, payload: filter }
}
