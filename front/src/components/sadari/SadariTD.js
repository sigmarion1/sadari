import React, { useState } from 'react'

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Dropdown,
  Feed,
  Label,
  Input,
} from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import { ColorTableRaw } from '../../utils/ColorTable'


const SadariTD = ({ vColor, hColor }) => {

  const hstyle = {
    // zIndex: 1,
    // height: '100%',
    width: '100%',
    // color: 'red',
    // borderColor: 'red',
    // border : '0px solid',
    borderBottom: '8px solid ' + hColor,
    // borderLeft: '8px solid ' + ColorTable[vColor], 
    // borderBottom: '6px solid ' + undefined, 
    // borderBottom: '6px solid red', 
    // borderWidth: '19px'
    // left: '50%',
    position: 'relative',
    // position: 'absolute',
    visibility: hColor? 'visible':'hidden',
    // float: 'left'
    // transition: 'border-bottom 0.1s'
  }

  const vstyle = {
    // zIndex: 2,
    width: '100%',
    height: '100%',
    // width: '8px',
    // height: '100%',
    color: 'red',
    // borderColor: 'red',
    // borderStyle: 'solid',
    borderLeft: '8px solid ' + vColor,
    // borderLeft: '8px solid black', 
    // borderWidth: '19px'
    left: '50%',
    position: 'relative',
    // float:'left',
    // transition: 'border-left 0.1s'
  }

  const tdStyle = {
    padding: '0px',
    height: '8px',
  }

  return (
    <td style={tdStyle}>

      <div style={vstyle}>
        <div style={hstyle} />
      </div>

    </td>
  )
}

export default SadariTD;
