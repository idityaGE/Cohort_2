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
// So, in the above code, we have created a custom hook called useTodos. This hook is used to fetch data from the server and return the data and loading state. We have used the useState and useEffect hooks to fetch the data from the server. We have used the axios library to fetch the data from the server. We have used the setInterval function to fetch the data from the server after a certain interval of time. We have also used the clearInterval function to clear the interval when the component unmounts or when the dependency array state variable changes.



// SWR Library
// So there is a popular library called SWR, which is used to fetch data from the server and it is very easy to use. It is developed by Vercel. It is a React Hooks library for remote data fetching. It is used to fetch data from the server and cache it locally
// Link: https://swr.vercel.app/

// Use of SWR
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

function Profile() {
    const { data, error, isLoading } = useSWR('https://api.github.com/users/idityage', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    // render data
    return <div>hello {data.login}!</div>
}

export { Profile }