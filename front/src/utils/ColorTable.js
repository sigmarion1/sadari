const ColorTable = [
    'white',
    'grey',
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
]

const ColorTableRaw = [
    '#FFFFFF',
    '#e8e8e8',
    '#db2828',
    '#f2711c',
    '#fbbd08',
    '#b5cc18',
    '#21ba45',
    '#00b5ad',
    '#2185d0',
    '#6435c9',
    '#a333c8',
    '#e03997',
    '#a5673f',
]

const getColorById = (id) => {
    return ColorTable[(id % (ColorTable.length - 2)) + 2]
}

const getColorRowById = (id) => {
    return ColorTableRaw[(id % (ColorTable.length - 2)) + 2]
}

export default ColorTable
export { ColorTableRaw, getColorById, getColorRowById }
