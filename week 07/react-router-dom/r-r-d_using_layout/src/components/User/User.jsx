import React from 'react'
import { useParams } from 'react-router-dom'//to access the params from the url


function User() {
    const {id} = useParams()
  return (
    <div className='text-center text-8xl bg-slate-500'>User: {id}</div>
  )
}

export default User