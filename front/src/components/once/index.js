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


const OrderComponent = () => {


    const { memberList, setMemberList } = useMemberList()
    const activeMemberList = memberList.filter((member) => member.active === true)
    const selectedMemberList = activeMemberList.filter((member) => member.once === true)
    const unSelectedMemberList = activeMemberList.filter((member) => member.once === false)


    // const { data: membersData, mutate } = useSWR('/api/members', fetcher)

    const [selectedMember, setSelectedMember] = useState(null)
    const [visible, setVisible] = useState(false)

    const onToggle = useCallback((id) => {
        setMemberList(
            activeMemberList.map(member =>
                member.id === id ? { ...member, once: !member.once} : member
            )
        )
    }, [activeMemberList])

    const onSelect = useCallback(async() => {
        const unSelectedMemberList = activeMemberList.filter((member) => member.once === false)

        if (unSelectedMemberList.length) {

            setVisible(true)
            await timeout(1000)
            setVisible(false)

            const selectedIndex = Math.floor(Math.random() * unSelectedMemberList.length)
            const selectedId = unSelectedMemberList[selectedIndex].id
    
            setSelectedMember(unSelectedMemberList[selectedIndex])
            setMemberList(
                memberList.map(member =>
                    member.id === selectedId ? { ...member, once: true} : member
                )
            )
        }


    }, [activeMemberList])


    const onReset = useCallback(() => {
        setMemberList(memberList.map(member => {
            return {...member, once: false}
        }))
    },
        [activeMemberList],
    )

    return (

        <>




                <Grid.Column>
                <Header as='h1' textAlign='center' style={{ margin: '1em' }}>
                    랜덤 뽑기
            </Header>

                    <Button positive onClick={() => onSelect()} disabled={visible || unSelectedMemberList.length === 0}>한명씩 뽑아보기</Button>
                    <Button negative onClick={() => onReset()} floated="right" disabled={visible}>초기화</Button>

                    <Message info>
        <Message.Header>안 뽑힌 사람 중 한명씩 뽑습니다!</Message.Header>
        <p>순서대로 뽑아보기 버튼을 눌러보세요!! <br/> 뽑힌 이력을 지우려면 초기화 버튼을 누르거나 뽑힌 참가자 명단에서 이름을 클릭하세요.</p>
      </Message>
      <Message info>
        <Message.Header>참가자 이름을 입력 하거나 상태를 변경하려면?</Message.Header>
        <p>화면 하단 참가자/대기자 명단을 사용하세요!!!</p>
      </Message>
                </Grid.Column>
                <Grid.Column>

                <Segment raised textAlign="center" style={{display: 'table', width: '100%', height:'150px', padding: '0'}} stacked inverted={visible}>
                    {
                        !visible && selectedMember && <MemberItem member={selectedMember} isBig size='massive' />
                    }

{
    visible && <Image size='small' src='/loading.gif' centered />
}
                   

                </Segment>

                <Header as='h3' textAlign='left'>
                    아직 안 뽑힌 참가자
                </Header>

                <Segment stacked>
                    {
                        unSelectedMemberList.map((member, id) => 
                        <MemberItem member={member} onClick={onToggle} key={id} />
                        )
                    }

                   

                </Segment>

                <Header as='h3' textAlign='left'>
                    뽑힌 참가자
                </Header>


                <Segment stacked>
                    {
                        selectedMemberList.map((member, id) => 
                        <MemberItem member={member} onClick={onToggle} key={id} />
                        )
                    }


                </Segment>

                </Grid.Column>

                        </>


    )
}

export default OrderComponent