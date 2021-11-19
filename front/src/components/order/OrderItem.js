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


const OrderItem = ({ member, order }) => {
    const { id, name, active } = member

    const color = (id, active) => {
        if (active === false ) {
            return ColorTable[1]
        } else {
            return getColorById(id)
        }
    }

    return (
        <List.Item>
                        <List.Content floated="right">
                        <Header as='h1' color={color(id, active)}>
                    {order} 등
                </Header>
            </List.Content>
            <Image size="mini" floated='left' avatar src={'https://avatars.dicebear.com/api/avataaars/' + name + '.svg'} />

            {/* <List.Content floated='right' verticalAlign='middle'>
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


            </List.Content> */}

            <List.Content verticalAlign='middle' floated="left">
                <Header as='h1' color={color(id, active)}>
                    {name}
                </Header>
            </List.Content>
        </List.Item>
    )
}

export default OrderItem