import React from 'react'
import useInterval from '../custom-hooks/useInterval'

const Timer = () => {
    const count = useInterval()
    return (
        <div>
            <h1>Timer</h1>
            <h1>{count}</h1>
        </div>
    )
}

export default Timer