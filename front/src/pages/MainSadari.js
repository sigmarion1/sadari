import React, { useState, useRef, useCallback, useMemo } from 'react'
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
    Statistic
} from 'semantic-ui-react'

import SadariComponent from '../components/sadari'
import MemberManager from '../components/memberManager'

const MainSadari = () => {

    return (
        <>

<MemberManager>
                <SadariComponent />
                </MemberManager>
        </>
    )
}


export default MainSadari;