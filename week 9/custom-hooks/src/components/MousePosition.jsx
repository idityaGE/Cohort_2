import React from 'react'
import useMousePointer from '../custom-hooks/useMousePointer'

const MousePosition = () => {
    const position = useMousePointer()
    // console.log(position)
    return (
        <div>
            <h1>Mouse Position</h1>
            <h1>X: {position.x}</h1>
            <h1>Y: {position.y}</h1>
        </div>
    )
}

export default MousePosition