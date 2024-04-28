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
        const interval = setInterval(() => {
            fetchTodos()
            console.log('Data fetched')
        }, sec * 1000)
        fetchTodos()
        return () => {
            clearInterval(interval)
        }
    }, [sec]) // if sec changes, it will start another interval that why we need to clear the previous interval

    return { todos, loading }
}

export default useTodos