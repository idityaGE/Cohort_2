import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [msg, setMsg] = useState<string[]>([])
  const [inputMsg, setInputMsg] = useState("")


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
    return () => {
      socket.close()
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
      <input type="text" onChange={(e) => {
        setInputMsg(e.target.value)
      }}/>
      <button onClick={() => {
        socket.send(inputMsg)
      }}>Send</button>

      {msg.map((msg, index) => {
        return(
          <h3 key={index}> {msg}</h3>
        )
      })}
    </>
  )
}

export default App


//TODO: we can also crate an useSocket hook that return the socket

/*
const useSocket = () => {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  useEffect(()=>{
    const socket = new WebSocket("ws://localhost:3000")
    socket.onopen = () => {
      console.log("WebSocket connection Sucessful")
      setSocket(socket)
    }
    return () => {
      socket.close()
    }
  },[])
  return socket
}
// In diffrent file
const socket = useSocket()
const [msg, setMsg] = useState<string[]>([])
useEffect(()=>{
  socket.onmessage = (msg) => {
    console.log("new msg recived:", msg.data)
    setMsg((p) => [...p,msg.data])
  }
},[])
*/