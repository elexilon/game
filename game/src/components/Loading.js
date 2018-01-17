import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {LinearProgress} from 'material-ui/Progress'
import PropTypes from 'prop-types'

class Loading extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool
  }

  render() {
    const { loading } = this.props

    if(!loading) return null

    return (
      <div className="Loading" style={{width:'100%'}} >
          <LinearProgress />
      </div>
    )
  }
}

const mapStateToProps = ({ loading }) => ({
  loading: loading.length > 0
})

export default connect(mapStateToProps)(Loading)
