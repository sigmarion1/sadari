import React, { useState, useCallback, useEffect } from 'react'
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
    Modal,
    Input,
    Form,
    Message
} from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import useInput from '../utils/useInput'
import fetcher from '../utils/fetcher'
import axios from 'axios'
import useSWR from 'swr'
import moment from 'moment'
import faker from 'faker'

faker.locale = "ko"

const Home = () => {

    const { data: userData } = useSWR('/api/auth', fetcher)
    const { data: usersData } = useSWR('/api/users', fetcher)

    const [detail, setDetail] = useState(true)
    const [open, setOpen] = useState(false)

    const [name, onChangeName] = useInput(faker.name.firstName() + '의 사다리')
    const [password, onChangePassword] = useInput('')

    const [signUpError, setSignUpError] = useState(false)
    const [signUpSuccess, setSignUpSuccess] = useState(false)

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault()

            if (!name || !name.trim()) {
                return
            }

            setSignUpError(false)
            setSignUpSuccess(false)
            axios
                .post('/api/auth/join', { name, password })
                .then(() => {
                    setSignUpSuccess(true)
                })
                .catch((err) => {
                    setSignUpError(true)
                })

        }, [name, password]
    )

    // if (userData) {
    //     return <Redirect to="/sadari" />
    // }

    return (
        <>

            <Segment
                inverted
                textAlign='center'
                style={{ minHeight: 400, padding: '1em 0em' }}
                vertical
            >
                <Container text>

                    <Image
                        size="large"
                        src='logo.png'
                        centered
                        style={{ padding: '1em' }}
                    />
                    {/* <Header>
                        {cname}
                    </Header> */}
                    <Header
                        as='h1'
                        content='지금까지의 사다리타기는 잊어라!'
                        inverted
                    />

                    <Header
                        as='h1'
                        content="편의성을 극대화한 '그냥' 사다리"
                        inverted
                    />

                    <Button primary size="huge" style={{ margin: '1em' }} onClick={() => setOpen(true)}>
                        일단 만들어 보기
                        <Icon name='right arrow' />

                    </Button>
                </Container>
            </Segment>

            {
                detail &&

                <Segment style={{ padding: '4em 0em' }} vertical basic>
                    <Grid container stackable verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    최고의 사용자 경험을 추구합니다
            </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    이름은 '그냥' 사다리지만 결코 '그냥' 만들진 않습니다.
                                    매일매일 같은 사람들 이름을 입력하느라 손가락이 고생하지 않도록, 철수는 1번, 영희는 2번 하느라 헷갈릴 일 없게
                                    '그냥' 사다리가 도와드리겠습니다.
            </p>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    공유 가능한 사다리
            </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    사다리를 만들면서 입력한 패스코드를 공유하면 누구나 접근하여 사다리를 탈 수 있습니다.
                                    참가자도 관리하고 결과도 공유해보면서 사다리를 타보세요!
            </p>
                            </Grid.Column>
                            <Grid.Column floated='right' width={6}>
                                <Image bordered rounded size='massive' src='/sadari.png' />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                                <Button size='huge' style={{ margin: '2em' }} onClick={() => setDetail(false)}>알고 있어요</Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column floated='left' width={6}>
                                <Image bordered rounded size='massive' src='/sadari2.png' />
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    참가자 관리는 한 번만
            </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    다양한 게임들이 참가자 데이터를 공유합니다. 모임 친구들을 등록하고 다양한 게임을 진행해보세요!
                                    '그냥' 사다리부터 안 뽑힌 사람 뽑는 '한 번씩 뽑기', 한번에 순서를 쫙! '순서 뽑기', 팀 나누기 애매할땐 '팀 나누기' 등 다양한 기능이 업데이트 예정입니다.
            </p>
                                <Header as='h3' style={{ fontSize: '2em' }}>
                                    아바타로 더 잘 구분하자
            </Header>
                                <p style={{ fontSize: '1.33em' }}>
                                    참가자를 추가하면서 아바타를 골라보세요. 랜덤으로 생성되는 수백개의 아바타가 여러분을 기다립니다.
            </p>
                            </Grid.Column>

                        </Grid.Row>

                    </Grid>
                </Segment>
            }

            <Segment style={{ padding: '4em 0em' }} vertical basic padded>
                <Card.Group stackable centered>
                {/* <Link to="/sadari"> */}
                    {/* <Card>
                        
                        <Button primary fluid as={Link} to='/sadari' style={{ height: '100%', verticalAlign:'middle'}}>직접 입력해서 시작하기</Button>

          
                        
                    </Card> */}
                    {/* </Link> */}
                    {
                        usersData &&
                        (usersData.map((user, i) => (
                            <Card key={i}>
                                {/* <Image src='ladder.png' wrapped ui={true} fluid></Image> */}

                                <Card.Content>
                                    <Image avatar floated='right' src={'https://avatars.dicebear.com/api/avataaars/' + user.name + '.svg'} />
                                    <Card.Header>
                                        {user.name}
                        </Card.Header>
                                    <CardDescription>
                                    마지막 접속 : {user.loginAt && moment(user.loginAt).format('YYYY-MM-DD HH:mm:ss')}
                        </CardDescription>
                                </Card.Content>
                                {/* <Card.Content extra>
                        <Icon name='user' /> 10명의 참가자
                    </Card.Content> */}
                                <Card.Content extra>
                                    <Button positive fluid as={Link} to={'/sadari?name=' + user.name}>
                                        참가
                        </Button>
                                </Card.Content>
                            </Card>
                        )

                        ))
                    }


                </Card.Group>

            </Segment>


            <Modal
                basic
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size='tiny'
                style={{ margin: '1em' }}
            >
                <Header icon>
                    <Icon name='road' />
                    사다리 만들기      </Header>
                <Modal.Content>
                    <Form onSubmit={onSubmit} size='large'>

                    <Form.Field>
                    <Form.Input
                            required
                            fluid
                            icon='road'
                            iconPosition='left'
                            placeholder='사다리 이름을 입력해 주세요'
                            value={name}
                            onChange={onChangeName}
                            style={{ marginBottom: '1em' }}
                        />

                           
                    <Form.Input
                            required
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='입장코드를 입력해 주세요'
                            type='password'
                            value={password}
                            onChange={onChangePassword}
                            style={{ marginBottom: '1em' }}
                        />

                    </Form.Field>
                     

                        <p>사다리 이름은 팀, 학습, 동아리 이름을 권장 드립니다. 예) 경영지원팀 사다리</p>
                        <p>공유할 수 있는 입장 코드를 입력해주세요. 입장코드를 아는 사람들만 들어올 수 있습니다.</p>
                        <p>입장코드는 암호화되어 관리자도 알 수 없습니다.</p>
                        <p>민감한 개인정보는 사다리 이름, 입장 코드로 사용하지 마세요</p>

                        <Grid textAlign="right" >
                            <Grid.Column>

                                <Button type="submit" color='green' inverted>
                                    <Icon name='checkmark' /> 생성
        </Button>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
                                    <Icon name='remove' /> 취소
        </Button>

                            </Grid.Column>
                        </Grid>


                    </Form>

                    {signUpError &&
                        <Message negative>
                            <Message.Header>
                                사다리 생성 실패!!
            </Message.Header>
                            <p>
                                중복된 이름입니다. 다른 이름을 넣어주세요.
            </p>
                        </Message>
                    }
                    {signUpSuccess &&
                        <Message positive>
                            <Message.Header>
                                사다리 생성 성공!!
            </Message.Header>
                            <p>
                                <a href={"/sadari?name=" + name}>여기</a>를 눌러 사다리로 이동합니다.
            </p>
                        </Message>
                    }
                </Modal.Content>
                <Modal.Actions>

                </Modal.Actions>
            </Modal>


        </>
    )
}


export default Home;
