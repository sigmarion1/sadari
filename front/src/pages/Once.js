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

import SadariComponent from '../components/sadari'
import OnceComponet from '../components/once'
import MemberManager from '../components/memberManager'

const Once = () => {

    return (
        <>
            <MemberManager>
                <OnceComponet />
                {/* <Message negative>
                    <Message.Header>
                    임시 페이지 입니다.
                    </Message.Header>
                    <p>
                        곧 업데이트 예정입니다.
                    </p>
                </Message>
             */}

            </MemberManager>
        </>
    )
}


export default Once;