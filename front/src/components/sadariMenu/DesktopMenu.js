import React, { useState, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

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
  Modal,
  Form,
  Message,
} from 'semantic-ui-react'

import { Link, Redirect } from 'react-router-dom'

import useInput from '../../utils/useInput'
import useQuery from '../../utils/useQuery'
import fetcher from '../../utils/fetcher'
import axios from 'axios'
import useSWR, { mutate } from 'swr'

import MemberListButton from './MemberListButton'


const SadariMenu = (props) => {
  const [visible, setVisible] = useState(false)
  const toggleVisible = () => setVisible(!visible)
  const handlePusher = () => {
    if (visible)
      setVisible(false)
  }

  // const { data: userData } = useSWR('/api/auth', fetcher)

  const [name, onChangeName] = useInput(useQuery().get("name") || '')
  const [password, onChangePassword] = useInput('')
  const [loginError, setLoginError ] = useState(false)

  const [exit, setExit] = useState(false)

  const onLogin = useCallback(
    (e) => {
        e.preventDefault()

        if (!name || !name.trim()) {
            return
        }

        setLoginError(false)
        axios
            .post('/api/auth/login', { name, password })
            .then(() => {
              mutate('/api/auth')
            })
            .catch((err) => {
                setLoginError(true)
            })

    }, [name, password]
)

const onLogout = useCallback(() => {
  axios
    .post('/api/auth/logout', null, {
      withCredentials: true,
    })
    .then(() => {
      mutate('/api/auth')
      setTimeout(() => {
        setExit(true)
      }, 500)
    });
}, []);

// const history = useHistory()

// const goBack = () => {
//   history.goBack()
// }



//   if(exit) {
//     return <Redirect to="/" />
//   }

  return (
    <>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon='labeled'
          inverted
          vertical
          visible={visible}
          size="massive"
          borderless
          // compact
          width='thin'
        >

          {/* <Menu.Item>
            <Menu.Header >
              {userData && userData.name}
          </Menu.Header>
          </Menu.Item> */}

          {/* <Menu.Item
            as={Link}
            to='/info'
            
          >
            <Icon name='info circle' size="large"/>
            ??????
          </Menu.Item>

          <Menu.Item
            as={Link}
            to='/member'
          >
            <Icon name='users' size="large" />
            ????????? ??????
          </Menu.Item> */}

          <Menu.Item
            as={Link}
            to='/sadari'
          >
            <Icon name='road' size="large" />
            ????????? ??????
          </Menu.Item>

          <Menu.Item
            as={Link}
            to='/order'
          >
            <Icon name='ordered list' size="large" />
            ?????? ??????
          </Menu.Item>

          <Menu.Item
            as={Link}
            to='/once'
          >
            <Icon name='clipboard check' size="large" />
            ?????? ??????
          </Menu.Item>

          <Menu.Item
            as={Link}
            to='/team'
          >
            <Icon name='object group' size="large" />
            ??? ?????????
          </Menu.Item>

          <Menu.Item
            as={Link}
            to='/setting'
          >
            <Icon name='setting' size="large" />
            ??????
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher
          dimmed={visible}
          onClick={handlePusher}
          style={{ minHeight: "100vh" }}
        >

          {/* <Menu fixed='top' inverted borderless> */}
          <Menu 
            inverted
            style={{ margin: '10px' }}
            borderless
            size='small'
            >

            {/* <Menu.Item
              onClick={toggleVisible}
            >
              <Icon
                name='sidebar'
                size="big"
                style={{ margin: '0' }}
              />
            </Menu.Item> */}

<Menu.Item
            as={Link}
            to='/'
          >
              <Image size='tiny' src='logo.png'></Image>
            </Menu.Item>

            <Menu.Item
            as={Link}
            to='/'
          >
              ???????????????
            </Menu.Item>



            <Menu.Item
            as={Link}
            to='/order'
          >
              ????????????
            </Menu.Item>

            <Menu.Item
            as={Link}
            to='/once'
          >
              ????????????
            </Menu.Item>
            <Menu.Item
            as={Link}
            to='/team'
          >
              ????????????
            </Menu.Item>

            <Menu.Item
            as={Link}
            to='/seat'
          >
              ????????????
            </Menu.Item>

            <Menu.Item
            as={Link}
            to='/question'
          >
              ???????????????
            </Menu.Item>

            <Menu.Item
            as={Link}
            to='/info'
          >
              ????????????????
            </Menu.Item>




            <Menu.Menu position='right'>
              <Menu.Item>

                  <Button primary fluid disabled>
                    ?????????
                  </Button>

                  {/* <Button negative>
                    ????????????
                  </Button> */}
    
              </Menu.Item>


            </Menu.Menu> 

          </Menu>
          
          {/* <Segment
            style={{ margin: '10px'}}
            secondary
          
          >

            <Button icon positive>
              <Icon name='plus' />
              </Button>
            
            <MemberListButton />
            <MemberListButton />
            <MemberListButton />
            <MemberListButton />
            
          </Segment> */}



          <Container style={{ marginTop: '2em' }}>
            {props.children}
          </Container>

        </Sidebar.Pusher>
      </Sidebar.Pushable>

{/* 
      <Modal
                basic
                // onClose={() => setOpen(false)}
                // onOpen={() => setOpen(true)}
                open={!userData}
                size='tiny'
                style={{ margin: '1em' }}
            >

                <Header icon>
                    <Icon name='road' />
                    ????????? ????????? ?????????     </Header>
                <Modal.Content>
                    <Form onSubmit={onLogin} size='large'>

                        <Form.Input
                            required
                            fluid
                            icon='road'
                            iconPosition='left'
                            placeholder='????????? ????????? ????????? ?????????'
                            value={name}
                            onChange={onChangeName}
                            style={{ marginBottom: '1em' }}
                        />
                        <Form.Input
                            required
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='??????????????? ????????? ?????????'
                            type='password'
                            value={password}
                            onChange={onChangePassword}
                            style={{ marginBottom: '1em' }}

                        />

  
                        <Grid textAlign="right" >
                            <Grid.Column>


        <Button basic color='red' inverted onClick={goBack}>
                                    <Icon name='remove' /> ??????
        </Button>
        <Button type="submit" color='green' inverted>
                                    <Icon name='sign-in' /> ??????
        </Button>

                            </Grid.Column>
                        </Grid>


                    </Form>

                    {loginError &&
                        <Message negative>
                            <Message.Header>
                                ?????? ??????
            </Message.Header>
                            <p>
                              ????????? ????????? ?????? ????????? ??????????????????.
            </p>
                        </Message>
                    }

                </Modal.Content>
                <Modal.Actions>

                </Modal.Actions>
            </Modal> */}
    </>
  )
}

export default SadariMenu;
