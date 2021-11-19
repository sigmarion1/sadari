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


const OrderComponent = () => {

    const { data: membersData, mutate } = useSWR('/api/members', fetcher)
    const [selectedMember, setSelectedMember] = useState(false)


    const onSelect = useCallback(() => {
        if (membersData) {
            const notSelectedMembers = membersData.filter((member) => member.once === false & member.status === 1)
            const selectedMember = notSelectedMembers[Math.floor(Math.random() * notSelectedMembers.length)]

            if(selectedMember) {
                axios
                .patch('/api/members/' + selectedMember.id, { once: true })
                .then(() => mutate())
            
                setSelectedMember(selectedMember)

            }


        }

    },
        [membersData],
    )

    const onReset = useCallback(() => {
        axios
        .get('/api/once')
        .then(() => mutate())
    },
        [membersData],
    )

    return (
        <Grid columns='equal' stackable relaxed>
            <Grid.Row>
                <Grid.Column>
                <Header as='h1' textAlign='center' style={{ margin: '1em' }}>
                    한 번씩 뽑기
            </Header>
            <Header as='h3' textAlign='left'>
                    아직 안 뽑힌 참가자
            </Header>
                    <Segment textAlign="center">
                    {
                            membersData &&
                            membersData.filter((user) => user.status === 1 && user.once === false).map((user) => (
                                <Label image color={getColorById(user.id, user.once)} key={user.id}>
                                    <img src={'https://avatars.dicebear.com/api/avataaars/' + user.name + '.svg'} />
                                    {user.name}
                                </Label>
                            )
                            )
                        }

                    </Segment>

                    <Header as='h3' textAlign='left'>
                    뽑힌 참가자
            </Header>
                    <Segment textAlign="center">
                    {
                            membersData &&
                            membersData.filter((user) => user.status === 1 && user.once === true).map((user) => (
                                <Label image color={getColorById(user.id, user.once)} key={user.id}>
                                    <img src={'https://avatars.dicebear.com/api/avataaars/' + user.name + '.svg'} />
                                    {user.name}
                                </Label>
                            )
                            )
                        }

                    </Segment>

                    <Button positive onClick={() => onSelect()}>안 뽑힌 참가자 중에서 뽑기</Button>
                    <Button negative onClick={() => onReset()} floated="right">리셋</Button>

                    <Message info>
        <Message.Header>안 뽑힌 참가자부터 한명씩 뽑습니다!!</Message.Header>
        <p>처음부터 다시 뽑으려면 리셋 버튼을 누르면 됩니다. 뽑혔던 결과는 저장되어 나중에 이어서 할 수 있습니다.</p>
      </Message>
      <Message info>
        <Message.Header>참가자 이름을 입력 하거나 상태를 변경하려면?</Message.Header>
        <p><mark><a href='/member'>참가자 관리</a></mark>에서 해 보세요!!</p>
      </Message>
                </Grid.Column>
                <Grid.Column stretched style={{maxHeight: '200px'}}>

                <Segment tertiary padded='very' raised textAlign="center" style={{display: 'table'}}>

                {
                    selectedMember &&
                    <Label size="massive" image color={getColorById(selectedMember.id)} 
                        style={{display: 'table-cell', verticalAlign: 'middle', maxHeight:'100px'}}>
                                    <img src={'https://avatars.dicebear.com/api/avataaars/' + selectedMember.name + '.svg'} />
                                    {selectedMember.name}
                                </Label>

                        }

                </Segment>

                </Grid.Column>

            </Grid.Row>

        </Grid>



    )
}

export default OrderComponent