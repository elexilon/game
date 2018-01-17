import ApiClient from '../../api/client'
import { loading, loadError } from '../loading'
import { push } from 'react-router-redux'

const api = new ApiClient()

export default (data) => {
  return dispatch => {
    const path = 'sessions'
    api.post(path, data)
      .then(res => {
        dispatch(loading(path, true))
        api.storeToken(res.body.token)
        dispatch(push('/'))
        dispatch(loading(path))
      })
      .catch(err => {
        dispatch(loading(path, true))
        dispatch(loadError(err))
        dispatch(loading(path))
      })
  }
}
