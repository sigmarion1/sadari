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
import OrderItem from './OrderItem'

import ColorTable, { getColorById } from '../../utils/ColorTable'

import { timeout } from '../../utils/Timeout'

import useMemberList from '../../contexts/memberList'

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


const OrderComponent = () => {


    const { memberList } = useMemberList()

    // const { data: membersData, mutate } = useSWR('/api/members', fetcher)
    const [shuffledData, setShuffledData] = useState([]);
    const [visible, setVisible] = useState(false)

    const onShuffle = useCallback( async() => {
        if (memberList) {

            const newMemberList = memberList.filter((member) => member.active ===true)
            setShuffledData([])
            setVisible(true)
            await timeout(2000)
            setVisible(false)
            setShuffledData(shuffle(newMemberList))
        }
    },
        [memberList],
    )

    const onReset = useCallback(() => {
        setShuffledData([])
    },
        [memberList],
    )

    return (

        <>




                <Grid.Column>
                <Header as='h1' textAlign='center' style={{ margin: '1em' }}>
                    순서 뽑기
            </Header>

                    <Button positive onClick={() => onShuffle()} disabled={visible}>순서대로 뽑아보기</Button>
                    <Button negative onClick={() => onReset()} floated="right" disabled={visible}>초기화</Button>

                    <Message info>
        <Message.Header>모든 참가자를 순서대로 뽑습니다!!</Message.Header>
        <p>순서대로 뽑아보기 버튼을 눌러보세요!! 뽑은 결과를 없애려면 초기화 버튼을 누르면 됩니다.</p>
      </Message>
      <Message info>
        <Message.Header>참가자 이름을 입력 하거나 상태를 변경하려면?</Message.Header>
        <p>화면 하단 참가자/대기자 명단을 사용하세요!!!</p>
      </Message>
                </Grid.Column>
                <Grid.Column>
                <Segment stacked inverted={visible}>

<List
                divided
                relaxed
            >

                    {/* <List
                        // celled
                        divided
                        // selection
                        // inverted
                        relaxed
                    // verticalAlign="middle"
                    > */}
                        {
                            shuffledData.map((member, id) => 
                            <OrderItem
                                member={member}
                                key={id}
                                order={id+1}
                                />
                            )
                        }
                        {/* {
                            shuffledData &&
                            shuffledData.filter((member) => member.active === true).map((member, id) => (
                                <OrderItem
                                    user={member}
                                    key={id}
                                    order={id+1}
                                />
                            )
                            )
                        } */}
                    {/* </List> */}
                   </List>
{
    visible && <Image size='small' src='/loading.gif' centered />
}
                   

                </Segment>

                </Grid.Column>

                        </>


    )
}

export default OrderComponent