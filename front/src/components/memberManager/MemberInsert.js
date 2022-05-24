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
    Form,
} from 'semantic-ui-react'

import useInput from '../../utils/useInput'
import faker from 'faker'

faker.locale = "ko"

const UserInsert = ({ onCreate, memberList }) => {
    const [name, onChangeName, setName] = useInput('')

    const onSubmit = useCallback(
        e => {
            e.preventDefault()

            if (name) {
                onCreate(name)
                setName('')
            } else {
                onCreate(faker.name.firstName())
                setName('')
            }
        },
        [name, memberList],
    )

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group unstackable>
                <Form.Input
                    placeholder="이름을 입력해 주세요"
                    value={name}
                    onChange={onChangeName}
                    // fluid
                    width={13}
                    // unstackable
                />
                <Form.Button 
                    width={3} 
                    icon='plus'
                    // unstackable 
                    fluid
                    primary
                />

            </Form.Group>

        </Form>

    )
}

export default UserInsert