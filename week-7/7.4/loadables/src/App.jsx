
import './App.css'
import { RecoilRoot, useRecoilStateLoadable } from 'recoil';
import { todosAtomFamily } from './atoms';

function App() {
  return <RecoilRoot>
    <Todo id={1} />
    <Todo id={2} />
  </RecoilRoot>
}

function Todo({ id }) {
  const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id));
  console.log(todo) 
  // {"state": "loading",    "contents": { } }
  // {"state": "hasValue", "contents": { "title": "title", "description": "description" } }
  if (todo.state === "loading") {
    return <div>loading..</div> // we can add some skeleton loader here [shadcn:skeleton-loader]
  }

  return (
    <>
      {todo.contents.title}
      {todo.contents.description}
      <br />
    </>
  )
}

export default App
