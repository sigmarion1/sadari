import React, { useCallback, useState, useEffect } from 'react'
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
// import TeamItem from './TeamItem'
import SeatList from './SeatList'

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
    const activeMemberList = memberList.filter((member) => member.active === true)

    // const { data: membersData, mutate } = useSWR('/api/members', fetcher)
    const [rows, setRows] = useState([]);
    const [options, setOptions] = useState([...Array(10)].map((option, id) => ({key: id + 1, text: id + 1, value: id + 1})))
    const [currentValue, setCurrentValue] = useState(3)
    const [visible, setVisible] = useState(false)


    const onReset = useCallback(() => {
        setRows(rows)
    },
        [memberList],
    )


    const onSetSeat = useCallback(async() => {
        
        const newMemberList = activeMemberList
        
        shuffle(newMemberList)

        const total = newMemberList.length
        const col = currentValue
        const row = Math.ceil(total / col)
        const rows = []
    
    
        for(let i = 0; i < row; i++) {
            rows.push(newMemberList.slice(i * col, (i + 1) * col))
        }

        setRows([])
        setVisible(true)
        await timeout(2000)
        setVisible(false)
        setRows(rows)

    },
        [memberList, currentValue],
    )


    return (

        <>

        <Segment style={{width:'100%', padding:'0.2em'}} inverted={visible} >

        {
    !visible && <SeatList rows={rows} />
            }

            

            {
    visible && <Image size='small' src='/loading.gif' centered />
            }

        </Segment>

        <Segment style={{width:'100%'}} >
        <Header as='h1' textAlign='center' style={{ margin: '1em' }}>
                    자리 배치
            </Header>

            <Divider />

            <Dropdown   
                    onChange={(e, {value}) => setCurrentValue(value)}
                    options={options}
                    selection
                    value={currentValue}
                    placeholder='1열당 사람 수'
                    // style={{width:'100px'}}
                    compact
                    />
                    개의 열로





<Button negative onClick={() => onReset()} floated='right' disabled={visible}>초기화</Button>
<Button positive onClick={() => onSetSeat()} 
                        disabled={activeMemberList.length < 2 || visible}
                        floated='right'
                        // style={{width:'50%'}}
                        >자리 배치</Button>

<Message info>
<Message.Header>앞에서부터 자리를 채웁니다</Message.Header>
        <p>뒷자리는 다 안 채워질 수 있습니다.</p>
      </Message>
      <Message info>
        <Message.Header>참가자 이름을 입력 하거나 상태를 변경하려면?</Message.Header>
        <p>화면 하단 참가자/대기자 명단을 사용하세요!!!</p>
      </Message>



        </Segment>











{/* <List
                divided
                relaxed
            >

                    {
                        teamData &&
                        teamData.map((team, id) => (
                            <TeamItem
                                team={team}
                                id={id}
                                visible={!visible}
                            />

                        ))
                        
                    }

                   </List> */}

                   

                        </>


    )
}

export default OrderComponent