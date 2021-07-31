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
import ColorTable, { getColorById } from '../../utils/ColorTable'


const UserItem = ({ user, onActivate, onDeActivate, onDelete }) => {
    const { id, name, status } = user

    const color = (id, status) => {
        if (status === 0) {
            return ColorTable[1]
        } else {
            return getColorById(id)
        }
    }


    return (
        <List.Item>
            <Image size="mini" floated='left' avatar src={'https://avatars.dicebear.com/api/avataaars/' + name + '.svg'} />

            <List.Content floated='right' verticalAlign='middle'>
                {(status === 1) &&
                    <Button onClick={() => onDeActivate(id)}>
                        대기로 전환
                </Button>
                }
                {(status === 0) &&
                    <Button positive onClick={() => onActivate(id)}>
                        참가
                            </Button>
                }
                {(status === 0) &&
                    <Button negative onClick={() => onDelete(id)}>
                        삭제
                            </Button>
                }


            </List.Content>
            <List.Content verticalAlign='middle'>
                <Header as='h1' color={color(id, status)}>
                    {name}
                </Header>
            </List.Content>
        </List.Item>
    )
}

export default UserItem