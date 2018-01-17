import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import signIn from '../actions/user/sign-in'
import Title from '../components/Title'

export class SignIn extends PureComponent {
  constructor() {
    super()
    this.state = {}
  }

  submitForm(event) {
    event.preventDefault()
    if (this.validateAll()) {
      const user = {
        email: this.refs.email.value,
        password: this.refs.password.value
      }
      this.props.signIn(user)
    }
  }

  validateAll() {
    return this.validateEmail()
  }

  validateEmail() {
    const { email } = this.refs

    if (email.value.match(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+$/)) {
      this.setState({
        emailError: null
      })
      return true
    }

    if (email.value === '') {
      this.setState({
        emailError: 'Please provide your email address'
      })
      return false
    }

    this.setState({
      emailError: 'Please provide a valid email address'
    })
    return false
  }


  render() {
    return (
      <div className="sign-up form">
        <Title content="Sign Up" />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <input ref="email" type="email" placeholder="Email address"
              onChange={this.validateEmail.bind(this)} />
            { this.state.emailError ?
              <p className="formError">{ this.state.emailError }</p> :
              null
            }
          </div>
          <div className="input">
            <input ref="password" type="password" placeholder="Password" />
            
          </div>
          <input type="submit" value="Sign up" />
        </form>
      </div>
    )
  }
}

export default connect(null, { signIn })(SignIn)
