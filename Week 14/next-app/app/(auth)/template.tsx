'use client'
import { useState } from "react"

export default function ({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)

  return (
    <div>
      <hr />
      TEMPLATE
      <br />
      {children}
      <button onClick={e => setCount(c => c += 1)}>template Count: {count}</button>
      <hr />
    </div>
  )
} 
