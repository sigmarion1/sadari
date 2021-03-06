import React, { useCallback, useEffect, useState, useContext } from 'react'

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

import faker from 'faker'
import axios from 'axios'
import useMemberList from '../../contexts/memberList'
import MemberItem from '../memberManager/MemberItem'




faker.locale = "ko"

const SADARILENGTH = 60

const MainSadari = () => {

  const { memberList } = useMemberList()

  // const { data: membersData, mutate } = useSWR('/api/members', fetcher)

  const members = memberList?.filter((member) => member.active === true)
  const verticalCount = SADARILENGTH
  const horizontalCount = members?.length
  const connCount = (horizontalCount-1) * (getRandomInt(3,6))
  const timeouts = []

  const [lState, setLState] = useState([])
  const [rState, setRState] = useState([])
  const [cover, setCover] = useState(false)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isOne, setIsOne] = useState(false)

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

    for (let i = 0; i < connCount; i++) {
      const [vIndex, hIndex] = [getRandomInt(1, verticalCount - 1), getRandomInt(0, horizontalCount - 1)]

      if (arr[vIndex - 1][hIndex]?.h || arr[vIndex + 1][hIndex]?.h) {
        continue
      }

      if (hIndex > 0) {
        if (arr[vIndex][hIndex - 1]?.h) {
          continue
        }
      }

      if (hIndex < horizontalCount - 1) {
        if (arr[vIndex][hIndex + 1]?.h) {
          continue
        }
      }

      arr[vIndex][hIndex].h = ColorTableRaw[1]

    }


    setLState(arr)
    setRState(new Array(horizontalCount).fill(null))


  })
  // resetHandler()


  useEffect(() => {
    resetHandler()
  }, [memberList])

  // useEffect(() => {
  //   setRState(lState[verticalCount - 1]?.map((node) => node.v - 2))
  // }, [lState])

  const runHandler = useCallback(async (order) => {

    if(members.length < 2) {
      setIsOne(true)
      return
    }

    setIsOne(false)

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
        timeouts.push(await timeout(20))

      }
      newRState[current.h] = members[i]
      setRState(newRState)
    }

    setIsPlaying(false)
  })

  const stopHandler = useCallback(async () => {
    for (let i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i])
    }
  })

//   const onCreate = useCallback(
//     (name) => {
//         axios
//             .post('/api/members', { name })
//             .then(() => mutate())
//     }, [membersData]
// )

// const onDelete = useCallback(
//   (id) => {
//       axios
//           .delete('/api/members/' + id)
//           .then(() => mutate())
//   }, [membersData]
// )


  return (
    <>


      <Segment>
        <table style={{ width: '100%', borderWidth: '0px', borderColor: 'gray', textAlignLast: 'center', borderSpacing: '0px', padding: '0px', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              {
                members &&
                members.filter((member) => member.active === true).map((member, index) => (

                  <th key={index}>
                    <MemberItem member={member} onClick={() => runHandler(index)} />
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody style={{position:'relative'}}>
          {
            cover &&
            <Image style={{position:'absolute', zIndex:4, width:'100%', height: '60%', top:'20%'}} centered src="cover.png" />

          }

            {
              lState.map((horizontal, vIndex) => (
                <tr key={vIndex} style={{position:'relative'}}>
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
                rState?.map((member, index) => (
                  <th key={index}>
                    {member &&

                  <MemberItem member={member}/>

                    }
                  </th>
                ))
              }
            </tr>
          </thead>
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



        </table>
      </Segment>

      <Segment style={{width:'100%'}}>
      {
        !isPlaying && <Button positive onClick={() => runHandler()}>??????</Button>
      }
      {
        isPlaying && <Button disabled negative onClick={() => stopHandler()}>???????????? ?????? ??? ?????????</Button>
      }
      {
        !isPlaying && <Button negative onClick={() => resetHandler()}>??????</Button>
      }

      {
        !cover && <Button floated='right' secondary onClick={() => setCover(true)}>????????? ??????</Button>
      }

{
        cover && <Button floated='right' secondary onClick={() => setCover(false)}>????????? ??????</Button>
      }





{
        isOne &&
        <Message warning>
        <Message.Header>????????? ?????? ??????</Message.Header>
        <p>????????? ????????? ???????????????.</p>
      </Message>

      }


      <Message info>
        <Message.Header>????????? ????????? ???????????????</Message.Header>
        <p>?????? ????????? ???????????? ???????????? ???????????????! ?????? ????????? ???????????? ?????? ?????? ??? ????????????!</p>

      </Message>



</Segment>




    </>
  )
}

export default MainSadari;
