import ApiClient from '../../api/client'
import { loading, loadError } from '../loading'
export const FETCHED_RECIPES = 'FETCHED_RECIPES'
export const FETCHED_ONE_RECIPE = 'FETCHED_ONE_RECIPE'

const api = new ApiClient()

export default () => {
  return dispatch => {
    const path = 'recipes'

    api.get(path)
      .then(res => {
        dispatch(loading(path, true))
        dispatch({ type: FETCHED_RECIPES, payload: res.body })
        dispatch(loading(path))
      })
      .catch(err => {
        dispatch(loading(path, true))
        dispatch(loadError(err))
        dispatch(loading(path))
      })
  }
}

export const fetchRecipeById = (id) => {
  return dispatch => {
    const path = `recipes/${id}`

    api.get(path)
      .then(res => {
        dispatch(loading(path, true))
        dispatch({ type: FETCHED_ONE_RECIPE, payload: res.body })
        dispatch(loading(path))
      })
      .catch(err => {
        dispatch(loading(path, true))
        dispatch(loadError(err))
        dispatch(loading(path))
      })
  }
}

export const toggleLikeRecipe = (recipeId) => {
  return {
    type: 'TOGGLE_LIKE_RECIPE',
    payload: recipeId
  }
}
