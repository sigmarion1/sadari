import React from 'react'
import {
  Switch,
  Route,
  Link
} from 'react-router-dom'

import { createMedia } from "@artsy/fresnel"



import MemberManager from './components/memberManager'

import SadariComponent from './components/sadari'
import DesktopMenu from './components/sadariMenu/DesktopMenu'
import Home from './pages/Home'
import Info from './pages/Info'
import MainSadari from './pages/MainSadari'
import Once from './pages/Once'
import Order from './pages/Order'
import Setting from './pages/Setting'
import Team from './pages/Team'
import Seat from './pages/Seat'
import User from './pages/User'
import Question from './pages/Question'
import { MemberListProvider } from './contexts/memberList'


const App = () => {
  return (
    <DesktopMenu>


    <Switch>
      <Route exact path="/">
      <MainSadari />
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
      <Route exact path="/seat">
        <Seat />
      </Route>
      <Route exact path="/question">
        <Question />
      </Route>
    </Switch>


    </DesktopMenu>

  )
}

export default App;
