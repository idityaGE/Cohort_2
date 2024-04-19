import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {

    //there is better way to use the fetch api using loader in react-router-dom
    // const [data, setData] = useState(0)
    // useEffect(() => {
    //     fetch('https://api.github.com/users/idityage')
    //         .then(response => response.json())
    //         .then(data => setData(data))
    // }, [])


    const data = useLoaderData()

    return (
        <>
            <div className='text-center text-white text-4xl bg-gray-800'>Github Followers : {data.followers}</div>
            <img src={data.avatar_url} alt="" />
        </>
    )
}

export default Github

export const githubInfoLoader = async() => {
    let data = await fetch('https://api.github.com/users/idityage')
    return data.json()
}

