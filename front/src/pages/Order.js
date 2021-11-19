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
    Statistic,
    Message
} from 'semantic-ui-react'

import OrderComponent from '../components/order'
import MemberManager from '../components/memberManager'

const Order = () => {

    return (
        <>
            <MemberManager>
                <OrderComponent />
            
            </MemberManager>
        </>
    )
}


export default Order;