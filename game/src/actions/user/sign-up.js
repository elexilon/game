import ApiClient from '../../api/client'
import { loading, loadError } from '../loading'
import { push } from 'react-router-redux'
//import { sleep } from '../../global/Utility'
export const SIGN_UP = 'SIGN_UP'

const api = new ApiClient()

export default (data) => {
  return dispatch => {
    const path = 'users'

    api.post(path, data)
    .then(_=> {
      dispatch(loading(path, true))
      dispatch(push('/sign-in'))
      dispatch(loading(path))
    })
    .catch(err => {
      dispatch(loading(path, true))
      dispatch(loadError(err))
      dispatch(loading(path))
    })
  }
}

// sleep(5000)
// .then(_ => dispatch(cleanError(err)))
// ))
