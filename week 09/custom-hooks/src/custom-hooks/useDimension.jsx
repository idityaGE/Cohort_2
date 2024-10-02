import React from 'react'
import { useEffect, useState } from 'react'

const useDimension = () => {
    const [dimension, setDimension] = useState({ width: window.innerWidth, height: window.innerHeight })
    useEffect(() => {
        const handleResize = () => {
            setDimension({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return dimension
}

export default useDimension