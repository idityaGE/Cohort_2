import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import './App.css'
import axios from 'axios'


function App() {

  const [token, setToken] = useState<string>("")

  const handleBtn = async (token: string) => {
    try {
      await axios.request({
        method: 'POST',
        url: 'http://localhost:3000/reset-password',
        headers: { 'content-type': 'application/json' },
        data: { email: 'adii@mail.com', otp: '873935', newPassword: 'mysupersecretpassword', token }
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <input placeholder='OTP'></input>
      <br /><br />
      <input placeholder='New password'></input>
      <br /><br />
      <Turnstile onSuccess={(token) => {
        setToken(token)
      }} siteKey='0x4AAAAAAAgI8dfRB35eWaX8' />
      <br /><br />
      <button onClick={() => {
        handleBtn(token)
      }}>Update password</button>
    </>
  )
}

export default App
