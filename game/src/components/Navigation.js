import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import signOut from '../actions/user/sign-out'
import { userSignedIn } from '../actions/user/user-signed-in'

export class Navigation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    this.props.userSignedIn()
  }

  signOut(event) {
    event.preventDefault()
    this.props.signOut()
  }

  render() {
    const { signedIn } = this.props

    return (
      <nav className="navigation">
        <ul>
          <li><Link to="/"> Home </Link></li>
          <li>
            { signedIn ?
              <a href="/" onClick={this.signOut.bind(this)}> Sign out </a> :
              <Link to="/sign-up">Sign up</Link>
            }
          </li>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { signOut, userSignedIn })(Navigation)
