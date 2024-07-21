import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [msg, setMsg] = useState<string[]>([])

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000')
    socket.onopen = () => {
      console.log("Connected")
      setSocket(socket)
    }
    socket.onmessage = (msg) => {
      console.log("Recived message :", msg.data)
      setMsg((pre: string[]): string[] => {
        return [...pre, msg.data]
      })
    }
  }, [])

  if (!socket) {
    return (
      <>
        <h1>Connecting to socket server ...</h1>
      </>
    )
  }

  return (
    <>
      {msg.map((msg, index) => {
        <h3 key={index}> {msg}</h3>
      })}
    </>
  )
}

export default App
