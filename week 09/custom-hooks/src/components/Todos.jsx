import useTodos from "../custom-hooks/DatafetchingHook";

import React from 'react'

export default function Todos() {
    const { todos, loading } = useTodos(2)
    return (
        <>
            {loading ? <h1>Loading...</h1> : todos.map(todo => <TodoItem key={todo.id} todo={todo} />) }
        </>
    )
}

function TodoItem({ todo }) {
    return (
        <div>
            <h5>Title: {todo.title}</h5>
            <h6>Status: {todo.completed}</h6>
        </div>
    )
}
