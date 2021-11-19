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

import SadariMenu from '../components/sadariMenu'
import SadariComponent from '../components/sadari'

const Info = () => {

    return (
        <>
            <SadariMenu>
                <Message negative>
                    <Message.Header>
                    임시 정보 페이지 입니다.
                    </Message.Header>
                    <p>
                        곧 업데이트 예정입니다.
                    </p>
                </Message>
                
                <h2>
                    업데이트 상황
                </h2>

                <ol>
                    <li>정보 - 스타일 적용 예정</li>
                    <li>참가자 관리 - 구현 완료</li>
                    <li>그냥 사다리 - 구현 완료</li>
                    <li>한 번씩 뽑기 - 구현 완료</li>
                    <li>순서 뽑기 - 구현 완료</li>
                    <li>팀 나누기 - 구현 완료</li>
                    <li>설정 - 업데이트 예정</li>
                </ol>

                <p>
                    사다리 개선 및 문제 제보 : axsim@naver.com
                </p>

            </SadariMenu>
        </>
    )
}


export default Info;