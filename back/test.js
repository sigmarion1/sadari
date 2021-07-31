const { User } = require('./models/')

const createData = () => {
    User.create({
        name: '블러드살인미소',
        arenaName: 'bloodkill#3523',
        avatar: 'avatar1.png',
    })
    
    User.create({
        name: '검성',
        arenaName: 'swordmaster#11238',
        avatar: 'avatar2.png',
    })
    
    User.create({
        name: '최효정',
        arenaName: 'dundundacne#8992',
        avatar: 'avatar3.png',
    })
    
    User.create({
        name: '미미',
        arenaName: 'mimi#25491',
        avatar: 'avatar4.png',
    })

}


const getData = async () => {
    const userData = await User.findOne({
        attributes: ['name']
    })
    console.log(userData)
}

getData()

