import React from 'react'
import { useEffect, useState } from 'react'

const useDebounce = ({ inputValue, delaySec }) => {
    const [debouncedValue, setDebouncedValue] = useState(inputValue)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/posts?title=${inputValue}`)
                const data = await res.json()
                setDebouncedValue(data)
            } catch (error) {
                console.log(error)
            }
        }
        let timeID = setTimeout(() => {
            fetchData()
        }, delaySec)
        return () => {
            clearTimeout(timeID)
        }
    }, [inputValue, delaySec])

    return debouncedValue
}

export default useDebounce