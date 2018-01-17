import ApiClient from '../../api/client'
import { loading, loadError } from '../loading'
//import { sleep } from '../../global/Utility'

export const USER_SIGNED_IN = 'USER_SIGNED_IN'


const api = new ApiClient()

export const userSignedIn = () => {
  return dispatch => {
    const path = 'users/me'
      if (!api.isAuthenticated()) return

      api.get('users/me')
      .then(res => {
        dispatch(loading(path, true))
        dispatch({ type: USER_SIGNED_IN, payload: res.body })
        dispatch(loading(path))
      })
      .catch(err => {
        dispatch(loading(path, true))
        dispatch(loadError(err))
        dispatch(loading(path))
      })
  }
}

export default userSignedIn
