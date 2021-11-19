import React from 'react'
import {
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { createMedia } from "@artsy/fresnel"

import MobileApp from './MobileApp'
import DesktopApp from './DesktopApp'
import { MemberListProvider } from './contexts/memberList'
import Media, { MediaContextProvider } from './contexts/Media'


const App = () => {
  return (
    <MemberListProvider>
    <MediaContextProvider>
    <Media at="sm">
      <MobileApp />
    </Media>
    <Media greaterThanOrEqual="lg">
      <DesktopApp />
    </Media>
  </MediaContextProvider>
  </MemberListProvider>
  )
}

export default App;
