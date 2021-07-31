import React from 'react'
import {
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Home from './pages/Home'
import Info from './pages/Info'
import MainSadari from './pages/MainSadari'
import Once from './pages/Once'
import Order from './pages/Order'
import Setting from './pages/Setting'
import Team from './pages/Team'
import User from './pages/User'


const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/info">
        <Info />
      </Route>
      <Route exact path="/member">
        <User />
      </Route>
      <Route exact path="/sadari">
        <MainSadari />
      </Route>
      <Route exact path="/once">
        <Once />
      </Route>
      <Route exact path="/order">
        <Order />
      </Route>
      <Route exact path="/team">
        <Team />
      </Route>
      <Route exact path="/setting">
        <Setting />
      </Route>
    </Switch>
  )
}

export default App;
