'use client'

import { signIn, signOut, useSession } from "next-auth/react"


const Appbar = () => {
  const session = useSession() // this will only work in client component to use this in sever components use "GetSeverSession"
  return (
    <div>
      <button onClick={() => signIn()}>Signin</button>
      <br />
      <button onClick={() => signOut()}>Logout</button>
      <hr />
      {JSON.stringify(session)}
      <hr />
    </div>
  )
}

export default Appbar