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

import SadariMenu from '../components/sadariMenu'
import SadariComponent from '../components/sadari'

const MainSadari = () => {

    return (
        <>
            <SadariMenu>
                

             
                <SadariComponent />

         
            </SadariMenu>
        </>
    )
}


export default MainSadari;