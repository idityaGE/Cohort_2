import React from 'react'
import useOnline from '../custom-hooks/UserIsOnline'

const IsOnline = () => {
    const isOnline = useOnline(3)
    console.log(isOnline)
    return (
        <div>
            {isOnline ? <h1>Online</h1> : <h1>Offline</h1>}
        </div>
    )
}

export default IsOnline
