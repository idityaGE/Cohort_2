import React from 'react'

function Todos({ todos }) {

    return (
        <div className="container mx-auto">
            {todos.map((todo) => {
                return (
                    <div key={todo._id} className="bg-white shadow-md rounded-md p-4 mb-4">
                        <h2 className="text-xl font-bold mb-2">{todo.title}</h2>
                        <p className="text-gray-600 mb-4">{todo.description}</p>
                        <button 
                        onClick={async () => {
                            const res = await fetch('http://localhost:3000/completed', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    id: todo._id
                                })
                            })
                            const data = await res.json()
                            console.log(data)
                        }}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${todo.completed ? 'opacity-50 cursor-not-allowed bg-green-500' : 'hover:bg-green-500'}`}>
                            {todo.completed ? "Completed" : "Mark as Completed"}
                        </button>
                    </div>
                )
            })}
        </div>
    );
}

export default Todos

