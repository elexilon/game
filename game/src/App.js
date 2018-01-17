import React from 'react'
import Routes from './routes'
import './App.sass'
import LoadErrors from './components/LoadErrors'
import Loading from './components/Loading'

class App extends React.Component {

  render() {
    return (
      <div>
        <Loading />
        <Routes />
        <LoadErrors />
      </div>
    )
  }
}

export default App
