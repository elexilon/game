import { CREATE_RECIPE } from '../actions/recipes/create'
import { FETCHED_RECIPES, FETCHED_ONE_RECIPE } from '../actions/recipes/fetch'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case CREATE_RECIPE :
      return [...state, payload]

    case FETCHED_RECIPES :
      return state.concat(payload)

    case FETCHED_ONE_RECIPE :
      return [payload].concat(state)

    default :
      return state
  }
}
