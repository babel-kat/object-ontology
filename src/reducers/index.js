import { combineReducers } from 'redux'
import chairs from './chairs'
import {filters, hoverFilters} from './filters'

export default combineReducers({
  chairs,
  filters,
  hoverFilters
})
