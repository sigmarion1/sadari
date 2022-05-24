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


const QuestionItem = ({question}) => {
    const { id, text } = question

    const color = (id, active) => {
        if (active === false || id ==0 ) {
            return ColorTable[1]
        } else {
            return getColorById(id)
        }
    }


    return (

        <Label size={'massive'} image color={color(id, true)} key={id} 
        style={{display: 'table-cell', verticalAlign: 'middle', height: '150px'}}
        >
        {text}
        
    </Label>


    )
}

export default QuestionItem