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

import SadariComponent from "../components/sadari";
import QuestionComponet from "../components/question";
import MemberManager from "../components/memberManager";

const Once = () => {
  return (
    <>
      <MemberManager>
        <QuestionComponet />
      </MemberManager>
    </>
  );
};

export default Once;
