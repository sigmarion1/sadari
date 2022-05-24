import React, { useCallback, useState } from 'react'
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
    Transition
} from 'semantic-ui-react'


import fetcher from '../../utils/fetcher'
import useSWR from 'swr'

import axios from 'axios'

import ColorTable, { getColorById } from '../../utils/ColorTable'

import { timeout } from '../../utils/Timeout'

import useMemberList from '../../contexts/memberList'
import MemberItem from '../memberManager/MemberItem'
import QuestionItem from './QuestionItem'
import QuestionList from './QuestionList'

const OrderComponent = () => {

    const defaultQuestion = {
        id : 0,
        text : '여기에 질문이 나타납니다',
    }

    const endQuestion = {
        id : 0,
        text : '질문이 모두 끝났습니다! 다시 시작하려면 초기화를 눌러주세요',
    }

    const { memberList, setMemberList } = useMemberList()

    // const [currentIndex, setcurrentIndex] = useState(0)
    const [question, setQuestion] = useState(defaultQuestion)
    const [currentQuestionList, setCurrentQuestionList] = useState(QuestionList)

    // const { data: membersData, mutate } = useSWR('/api/members', fetcher)

    const [visible, setVisible] = useState(false)


    const onSelect = useCallback(async() => {


            console.log(currentQuestionList)
            setVisible(true)
            await timeout(1500)

            if (currentQuestionList.length == 0) {
                setQuestion(endQuestion)
            } else {
                const currentIndex = Math.floor(Math.random() * currentQuestionList.length)
                setQuestion(currentQuestionList[currentIndex])
                setCurrentQuestionList(currentQuestionList.filter((value, index) => index !== currentIndex ))
            }

            setVisible(false)

    }, [question, currentQuestionList])


    const onReset = useCallback(() => {
        setQuestion(defaultQuestion)
        setCurrentQuestionList(QuestionList)
    },
        [question, currentQuestionList],
    )

    return (

        <>

                <Grid.Column>
                <Header as='h1' textAlign='center' style={{ margin: '1em' }}>
                    그냥 질문지
            </Header>

                    <Button positive onClick={() => onSelect()} disabled={visible}>질문지 뽑기</Button>
                    <Button negative onClick={() => onReset()} floated="right" disabled={visible}>초기화</Button>

                    <Message info>
        <Message.Header>아이스브레이킹, 자기소개를 위한 질문지 뽑기!</Message.Header>
        <p>질문지 뽑기 버튼을 눌러서 다양한 질문들을 뽑아보세요!</p>
      </Message>

                </Grid.Column>
                <Grid.Column>
                    <br></br>

                <Segment raised textAlign="center" style={{display: 'table', width: '100%', height:'150px', padding: '0'}} stacked inverted={visible}>
                    {
                        !visible && <QuestionItem question={question}/>
                    }

{
    visible && <Image size='small' src='/loading.gif' centered />
}
                   

                </Segment>



                </Grid.Column>

                        </>


    )
}

export default OrderComponent