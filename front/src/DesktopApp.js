import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import { createMedia } from "@artsy/fresnel";

import MemberManager from "./components/memberManager";

import SadariComponent from "./components/sadari";
import DesktopMenu from "./components/sadariMenu/DesktopMenu";
import Home from "./pages/Home";
import Info from "./pages/Info";
import MainSadari from "./pages/MainSadari";
import Once from "./pages/Once";
import Order from "./pages/Order";
import Setting from "./pages/Setting";
import Team from "./pages/Team";
import Seat from "./pages/Seat";
import User from "./pages/User";
import Question from "./pages/Question";
import { MemberListProvider } from "./contexts/memberList";
import Router from "./Router";

const App = () => {
  return (
    <DesktopMenu>
      <Router />
    </DesktopMenu>
  );
};

export default App;
