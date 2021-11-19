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


const MemberListButton = () => {

    const options = [
        { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
        { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
        { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
      ]
      



    return (
        <>

<Dropdown
    text='개발팀'
    // icon='filter'
    floating
    // labeled
    button
    // className='icon'
  >
    <Dropdown.Menu>
      {/* <Dropdown.Header icon='tags' content='Filter by tag' />
      <Dropdown.Divider /> */}
      <Dropdown.Item icon='download' text='불러오기' />
      <Dropdown.Item icon='upload' text='서버에 저장' />
      <Dropdown.Item icon='edit' text='이름변경' onClick={()=>prompt('dd')} />
      <Dropdown.Item icon='delete' text='삭제' />
    </Dropdown.Menu>
  </Dropdown>

{/* <Button.Group 
// color='teal'
>
    <Button>개발팀</Button>
    <Dropdown
      className='button icon'
      floating
      options={options}
      trigger={<></>}
    />
  </Button.Group> */}

        </>

    )
}

export default MemberListButton