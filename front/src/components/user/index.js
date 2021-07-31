import React, { useCallback } from 'react'
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
    Statistic
} from 'semantic-ui-react'
import UserInsert from './UserInsert'
import UserItem from './UserItem'


import fetcher from '../../utils/fetcher'
import useSWR from 'swr'

import axios from 'axios'

const UserComponent = () => {

    const { data: membersData, mutate } = useSWR('/api/members', fetcher)

    const onCreate = useCallback(
        (name) => {
            axios
                .post('/api/members', { name })
                .then(() => mutate())
        }, [membersData]

    )


    const onActivate = useCallback(
        (id) => {
            axios
                .patch('/api/members/' + id, { status: 1 })
                .then(() => mutate())
        }, [membersData]
    )


    const onDeActivate = useCallback(
        (id) => {
            axios
                .patch('/api/members/' + id, { status: 0 })
                .then(() => mutate())
        }, [membersData]
    )

    const onDelete = useCallback(
        (id) => {
            axios
                .delete('/api/members/' + id)
                .then(() => mutate())
        }, [membersData]
    )





    return (

        <Grid>
            <Grid.Column style={{ maxWidth: 1000 }}>
                <Header as='h1' textAlign='center' style={{ margin: '1em' }}>
                    사다리 참가자
            </Header>
                <Segment stacked>
                    <List
                        // celled
                        divided
                        // selection
                        size="massive"
                        // inverted
                        relaxed
                    // verticalAlign="middle"
                    >
                        {
                            membersData &&
                            membersData.filter((user) => user.status === 1).map((user) => (
                                <UserItem
                                    user={user}
                                    key={user.id}
                                    onActivate={onActivate}
                                    onDeActivate={onDeActivate}
                                    onDelete={onDelete}
                                />
                            )
                            )
                        }
                    </List>
                    <UserInsert onCreate={onCreate} />
                </Segment>

                <Header as='h1' textAlign='center' style={{ margin: '1em' }}>
                    대기자
            </Header>
                <Segment stacked>
                    <List
                        // celled
                        divided
                        // selection
                        size="massive"
                        // inverted
                        relaxed
                    // verticalAlign="middle"
                    >
                        {
                            membersData &&
                            membersData.filter((user) => user.status === 0).map((user) => (
                                <UserItem
                                    user={user}
                                    key={user.id}
                                    onActivate={onActivate}
                                    onDeActivate={onDeActivate}
                                    onDelete={onDelete}
                                />
                            )
                            )
                        }
                    </List>
                </Segment>
            </Grid.Column>
        </Grid>



    )
}

export default UserComponent