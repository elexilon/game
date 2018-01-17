import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import PropTypes from 'prop-types'
import { clearError } from '../actions/loading'
import { sleep } from '../global/Utility'

class LoadError extends PureComponent {
  static propTypes = {
    message: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    const { dispatch, message } = this.props
    dispatch(clearError(message))
  }

  render() {
    const { dispatch, message } = this.props

    sleep(6000)
    .then(_ => dispatch(clearError(message)))

    return (
      <div>
          <Snackbar
            open={true}
            //autoHideDuration={6000}
            onClick={this.handleClose}
            SnackbarContentProps={{ 'aria-describedby': 'message-id', }}
            message={<span id="message-id">{ message }</span>}

          />
      </div>
    )
  }
}

export default connect()(LoadError)
