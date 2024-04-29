import React from 'react'
import { useEffect, useState } from 'react'

const useInterval = () => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        setInterval(() => {
            setCount(p => p + 1)
        }, 1000)
    }, [])
    return count
}

export default useInterval