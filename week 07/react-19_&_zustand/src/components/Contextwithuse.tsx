import { createContext, use, useState } from 'react'

interface ContextType {
  cnt: number
  setCnt: (cnt: number) => void
}

const Context = createContext<ContextType>({
  cnt: 10,
  setCnt: () => { }
})

const ConterProvider = ({ children }: { children: React.ReactNode }) => {
  const [cnt, setCnt] = useState(0)
  return (
    <Context.Provider value={{ cnt, setCnt }}>
      {children}
    </Context.Provider>
  )
}

const useCounter = () => {
  const { cnt, setCnt } = use(Context) //! use 'use' instead of 'useContext'
  return { cnt, setCnt }
}

export { Context, ConterProvider, useCounter }