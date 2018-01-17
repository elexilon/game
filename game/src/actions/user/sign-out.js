import ApiClient from '../../api/client'
import { loading } from '../loading'
import { push } from 'react-router-redux'
export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'

const api = new ApiClient()

export const userSignedOut = () => {
  return dispatch => {
    const path = 'sessions'

    dispatch(loading(path, true))
    api.removeToken()
    dispatch(loading(path))
    dispatch({type: USER_SIGNED_OUT})
    dispatch(push('/'))
  }
}

export default userSignedOut
