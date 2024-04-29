import React from 'react'
import useDebounce from '../custom-hooks/useDebounce'
import { useEffect, useState } from 'react'

const DebounceValue = () => {
    const [filter, setFilter] = useState('')
    const debouncedValue = useDebounce({ inputValue: filter, delaySec: 5000 })
    const [data, setData] = React.useState([])
    useEffect(() => {
        setData(debouncedValue)
    }, [debouncedValue])
    console.log(data)
    return (
        <div>
            <h1>DebounceValue</h1>
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
        </div>
    )
}

export default DebounceValue