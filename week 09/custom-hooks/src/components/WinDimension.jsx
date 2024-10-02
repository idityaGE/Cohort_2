import React from 'react'
import useDimension from '../custom-hooks/useDimension'

const WinDimension = () => {
    const dimension = useDimension()
    return (
        <div>
            <h1>Window Dimension</h1>
            <h1>Width: {dimension.width}</h1>
            <h1>Height: {dimension.height}</h1>
        </div>
    )
}

export default WinDimension