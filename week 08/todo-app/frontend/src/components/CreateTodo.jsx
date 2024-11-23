import React from 'react'
import { useState } from 'react'

function CreateTodo() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const onclickhandler = () => {
        fetch('http://localhost:3000/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    return (
        //todo form
        <div className='flex flex-col space-y-4 w-1/2 border-2 rounded-md p-5'>
            <input
                onChange={(e) => { setTitle(e.target.value) }}
                type="text"
                placeholder='Title'
                className='border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
                onChange={(e) => { setDescription(e.target.value) }}
                type="text"
                placeholder='Description'
                className='border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
                className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600'
                onClick={onclickhandler}
            >
                Add Todo
            </button>
        </div>
    );
}

export default CreateTodo