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
import SeatCols from './SeatCols'
import Media from '../../contexts/Media'


const SeatList = ({ rows }) => {

    const size = () => {
        if (rows[0].length < 3 ) {
            return 'big'
        } else if (rows[0].length < 6) {
            return 'medium'
        } else {
            return null
        }
    }



    return (
        <>





<Header textAlign='center' as='h1' block style={{margin: '0.2em'}}>
                앞
            </Header>


            <Media at="sm">
        <Table basic='very' textAlign='center' unstackable>

        <Table.Body>
            {
                rows.map((row, id) => <SeatCols cols={row} size={size()} key={id} />)
            }
            </Table.Body>
            </Table>
    </Media>

    <Media greaterThanOrEqual="lg">
    <Table basic='very' textAlign='center' unstackable>
    <Table.Body>
            {
                rows.map((row, id) => <SeatCols cols={row} size='massive' key={id} />)
            }
            </Table.Body>


        </Table>

        </Media>





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