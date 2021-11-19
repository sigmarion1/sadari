import React, { createContext ,useContext,useState } from 'react'

const MemberListContext = createContext([
    {
        id: 1,
        name: '철수',
        active: true,
        once: false, 
    },
    {
        id: 2,
        name: '영희',
        active: true,
        once: false, 
    },
    {
        id: 3,
        name: '민수',
        active: false,
        once: false, 
    },
    {
        id: 4,
        name: '수연',
        active: true,
        once: false, 
    },
])

const MemberListProvider = ({ children }) => {
    const [memberList, setMemberList] = useState([
        {
            id: 1,
            name: '철수',
            active: true,
            once: false, 
        },
        {
            id: 2,
            name: '영희',
            active: true,
            once: false, 
        },
        {
            id: 3,
            name: '민수',
            active: false,
            once: false, 
        },
        {
            id: 4,
            name: '수연',
            active: true,
            once: false, 
        },
    ])
    
    return (
        <MemberListContext.Provider value={{ memberList, setMemberList}}>
            {children}
        </MemberListContext.Provider>
    )
}

const useMemberList = () => useContext(MemberListContext)

export { MemberListProvider }

export default useMemberList