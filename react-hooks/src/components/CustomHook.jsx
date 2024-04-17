import { useState, useEffect } from 'react'

// to create a custom hook, we need to create a function that returns the data we want to use in our component and has prefix 'use' in its name
export default function useTodos() { // custom hook
    const [todos, setTodos] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos') // we can also use axios here
            .then(response => response.json())
            .then(json => setTodos(json))
    }, [])

    return todos
}

// to use this custom hook in our component, we need to import it and call it
// import { useTodos } from './CustomHook'
// const todos = useTodos()