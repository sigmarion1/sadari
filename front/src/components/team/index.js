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
import TeamItem from './TeamItem'

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
    const [teamData, setTeamData] = useState([]);
    const [options, setOptions] = useState([])
    const [currentValue, setCurrentValue] = useState(2)
    const [visible, setVisible] = useState(false)

    const onShuffle = useCallback( async() => {
        if (memberList) {

            const newMemberList = memberList.filter((member) => member.active ===true)
            // setShuffledData([])
            // setVisible(true)
            // await timeout(2000)
            // setVisible(false)
            // setShuffledData(shuffle(newMemberList))
        }
    },
        [memberList],
    )

    const onReset = useCallback(() => {
        setTeamData([])
    },
        [memberList],
    )

    const onChangeOptions = useCallback(() => {

        if(activeMemberList.length > 0) {
            const length = activeMemberList.length >= 8 ? 8 : activeMemberList.length
            const newOptions = [...Array(length-1)].map((option, id) => {
                return {key: id + 2, text: id + 2, value: id + 2}
            })
            setOptions(newOptions)

        }

    }, [memberList, currentValue])

    const onSetTeam = useCallback(async() => {
        
        const newMemberList = activeMemberList
        
        shuffle(newMemberList)

        const result = Array(currentValue)

        const unit = newMemberList.length / currentValue

        for (let i = 0; i < currentValue; i++) {
            result[i] = newMemberList.slice(unit*i, unit*(i+1))
        }
        setTeamData([])
        setVisible(true)
        await timeout(2000)
        setVisible(false)

        setTeamData(result)

    },
        [memberList, currentValue],
    )

    useEffect(() => {
        onChangeOptions()
      }, [memberList])

    return (

        <>



                <Grid.Column>
                <Header as='h1' textAlign='center' style={{ margin: '1em' }}>
                    ??? ?????????
            </Header>


            <Dropdown   
                    onChange={(e, {value}) => setCurrentValue(value)}
                    options={options}
                    selection
                    value={currentValue}
                    // placeholder='??? ????????? ???????????????'
                    // style={{width:'100px'}}
                    compact
                    />?????????
                    


                    <Button negative onClick={() => onReset()} floated='right' disabled={visible}>?????????</Button>
                    <Button positive onClick={() => onSetTeam()} 
                        disabled={activeMemberList.length < 2 || visible}
                        floated='right'
                        // style={{width:'50%'}}
                        >?????????</Button>
                    




                    <Divider />

                    <Message info>
        <Message.Header>?????? ???????????? ???????????? ????????????!!</Message.Header>
        <p>????????? ?????? ????????? ???????????? ????????? ??? ?????? ?????? ?????? ????????? ?????? ??? ????????????.</p>
      </Message>
      <Message info>
        <Message.Header>????????? ????????? ?????? ????????? ????????? ????????????????</Message.Header>
        <p>?????? ?????? ?????????/????????? ????????? ???????????????!!!</p>
      </Message>
                </Grid.Column>
                <Grid.Column>
                <Segment stacked inverted={visible}>

<List
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