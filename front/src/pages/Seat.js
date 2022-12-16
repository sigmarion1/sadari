import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment,
  Sidebar,
  Visibility,
  Dropdown,
  Card,
  CardDescription,
  Label,
  Input,
  Statistic,
  Message,
} from "semantic-ui-react";
import MemberManager from "../components/memberManager";

import SeatComponent from "../components/seat";

const Team = () => {
  return (
    <>
      <MemberManager>
        <SeatComponent />
      </MemberManager>
    </>
  );
};

export default Team;
