import { useState, useEffect } from "react";
import axios from "axios";

function useTodos(sec) {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchTodos = async () => {
        const response = await axios.get('https://sum-server.100xdevs.com/todos')
        setTodos(response.data.todos)
        setLoading(false)
    }

    useEffect(() => {
        setInterval(() => {
            fetchTodos()
            console.log('Data fetched')
        }, sec * 1000)
        fetchTodos()
    }, [sec])

    return { todos, loading }
}

export default useTodos