import React from 'react'
import { useState } from 'react'

let count = 4; // This is a global variable

function Todo() {
    const todos = [
        {
            id: 1,
            text: 'Learn React',
            description: 'Learn the basics of React',
            completed: false
        },
        {
            id: 2,
            text: 'Learn Redux',
            description: 'Learn the basics of Redux',
            completed: false
        },
        {
            id: 3,
            text: 'Build a project',
            description: 'Build a project using React and Redux',
            completed: false
        }
    ]
    const addTodo = () => {
        setTodo([...todo, {
            id: count++,
            text: `${Math.random()}`,
            description: `${Math.random()}`,
            completed: false
        }])
    }

    const [todo, setTodo] = useState(todos)

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Todo App</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addTodo}>Add Todo</button>
            {todo.map((item) => (
                <div key={item.id} className='bottom-2 border-white mt-4 p-4'>
                    <h3 className="text-lg font-bold">{item.text}</h3>
                    <p className="text-gray-500">{item.description}</p>
                    <p className="text-sm">{item.completed ? 'Completed' : 'Not Completed'}</p>
                </div>
            ))}
        </div>
    )
}

export default Todo