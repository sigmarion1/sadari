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
    Statistic,
    Table
} from 'semantic-ui-react'
import ColorTable, { getColorById } from '../../utils/ColorTable'
import MemberItem from '../memberManager/MemberItem'


const SeatList = ({ cols, size }) => {





    return (
        <>
        <Table.Row textAlign='center'>
            {
                cols.map((col, id) =><Table.Cell style={{padding:'0'}} ><MemberItem member={col} key={id} size={size} /></Table.Cell> )
            }
        </Table.Row>






                        {/* <Header as='h3' textAlign='left'>
                    {id + 1} 팀 : {team.length} 명
            </Header>

                <Segment stacked>
                {
        team &&
        team.map((member) => (
            <MemberItem 
            member={member}
        />
        )
        )
    }

                </Segment> */}
        </>

    )
}

export default SeatList