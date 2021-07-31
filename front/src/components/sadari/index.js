import React, { useCallback, useEffect, useState } from 'react'

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Dropdown,
  Feed,
  Label,
  Input,
  Transition,
  Message
} from 'semantic-ui-react'

import { Link } from 'react-router-dom'

import SadariTD from './SadariTD'
import ColorTable, { ColorTableRaw, getColorById, getColorRowById } from '../../utils/ColorTable'
import { getRandomInt } from '../../utils/Random'
import { timeout } from '../../utils/Timeout'
import EditableInput from './EditableText'

import fetcher from '../../utils/fetcher'
import useSWR from 'swr'

const SADARILENGTH = 40
const players = ['철수', '영희', '민수', '슬기', '수지', '지수', '영애', '민기']

const MainSadari = (props) => {

  const { data: membersData, mutate } = useSWR('/api/members', fetcher)

  const members = membersData?.filter((member) => member.status === 1)
  const verticalCount = SADARILENGTH
  const horizontalCount = members?.length
  const connCount = horizontalCount * 3
  const timeouts = []

  const [lState, setLState] = useState([])
  const [rState, setRState] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)

  const resetHandler = useCallback(async (e) => {
    const arr = []

    for (let i = 0; i < verticalCount; i++) {
      let verticalArr = []

      for (let j = 0; j < horizontalCount; j++) {
        let node = { v: ColorTableRaw[1] }

        verticalArr.push(node)
      }
      arr.push(verticalArr)
    }

    setLState(arr)
    setRState(new Array(horizontalCount).fill(null))

  })

  
  const replaceHandler = useCallback(async (e) => {
    for (let i = 0; i < connCount; i++) {
      const newLState = lState.slice()

      const [vIndex, hIndex] = [getRandomInt(1, verticalCount - 1), getRandomInt(0, horizontalCount - 1)]

      if (newLState[vIndex - 1][hIndex].h || newLState[vIndex + 1][hIndex].h) {
        continue
      }

      if (hIndex > 0) {
        if (newLState[vIndex][hIndex - 1].h) {
          continue
        }
      }

      if (hIndex < horizontalCount - 1) {
        if (newLState[vIndex][hIndex + 1].h) {
          continue
        }
      }

      newLState[vIndex][hIndex].h = ColorTableRaw[1]
      setLState(newLState)
    }
  })

  useEffect(() => {
    resetHandler()
  }, [membersData])

  // useEffect(() => {
  //   setRState(lState[verticalCount - 1]?.map((node) => node.v - 2))
  // }, [lState])





  const runHandler = useCallback(async (order) => {
    
    setIsPlaying(true)

    const startId = order || 0
    const endId = order + 1 || horizontalCount
    const newRState = rState.slice()

    for (let i = startId; i < endId; i++) {
      const current = { h: i, v: 0, color: getColorRowById(members[i].id) }
      for (let j = 0; j < verticalCount; j++) {

        // if (!isPlaying) {
        //   return
        // }

        const newLState = lState.slice()
        newLState[current.v][current.h].v = current.color

        if (newLState[current.v][current.h - 1]?.h) {
          current.h = current.h - 1
          newLState[current.v][current.h].h = current.color
          newLState[current.v][current.h].v = current.color
        } else if (newLState[current.v][current.h]?.h) {
          newLState[current.v][current.h].h = current.color
          current.h = current.h + 1
          newLState[current.v][current.h].v = current.color
        }

        current.v = current.v + 1
        setLState(newLState)
        timeouts.push(await timeout(10)) 

      }
      newRState[current.h] = members[i]
      setRState(newRState)
    }

    setIsPlaying(false)
  })

  const stopHandler = useCallback(async () => {
    for (let i = 0; i < timeouts.length; i++){
      clearTimeout(timeouts[i])
    }
  })



  return (
    <>
      

      <Segment>
        <table style={{ width: '100%', borderWidth: '0px', borderColor: 'gray', textAlignLast: 'center', borderSpacing: '0px', padding: '0px', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              {
                members &&
                members.map((member, index) => (

                  <th key={index}>
                    <Label as='a' color={getColorById(member.id)} image onClick={() => runHandler(index)}>
                      <img src={'https://avatars.dicebear.com/api/avataaars/' + member.name + '.svg'} />
                      {member.name}
                    </Label>
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              lState.map((horizontal, vIndex) => (
                <tr key={vIndex}>
                  {horizontal.map((node, hIndex) => (
                    <SadariTD
                      vColor={node.v}
                      hColor={node.h}
                      key={hIndex}
                    />
                  ))}
                </tr>
              ))
            }
          </tbody>
          <thead>
            <tr>
              {
                members &&
                members.map((_, index) => (

                  <th key={index}>
                    <EditableInput text={index + 1}></EditableInput>
                  </th>
                ))
              }
            </tr>
          </thead>
          <thead>
            <tr>
                {
                  rState?.map((member, index) => (
                    <th key={index}>
                      { member &&
                        <Label color={getColorById(member.id)} image>
                          <img src={'https://avatars.dicebear.com/api/avataaars/' + member.name + '.svg'} />
                          {member.name}
                        </Label>
                      }
                    </th>
                  ))
                }
            </tr>
          </thead>


        </table>
      </Segment>
      {
        !isPlaying && <Button positive onClick={() => runHandler()}>시작</Button>
      }
            {
        isPlaying && <Button disabled negative onClick={() => stopHandler()}>사다리가 진행 중 입니다</Button>
      }
      {
        !isPlaying && <Button primary onClick={() => replaceHandler()}>선 추가하기</Button>
      }
      {
        !isPlaying && <Button secondary onClick={() => resetHandler()}>리셋</Button>
      }
      
      

      <Message info>
        <Message.Header>아무 참가자도 보이지 않나요?</Message.Header>
        <p><a href='/member'>참가자 관리</a>에서 참가자를 추가해 보세요!!</p>
      </Message>
      <Message info>
        <Message.Header>사다리 타기를 시작하려면</Message.Header>
        <p>시작 버튼을 누르거나 참가자를 클릭하세요!</p>
      </Message>
      <Message info>
        <Message.Header>당첨 내용을 바꾸고 싶나요?</Message.Header>
        <p>클릭하면 값을 변경할 수 있습니다! 자주 쓰는 당첨 내용 저장 기능도 업데이트 예정이에요!</p>
      </Message>

    </>
  )
}

export default MainSadari;
