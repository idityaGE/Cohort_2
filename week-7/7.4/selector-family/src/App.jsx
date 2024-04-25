
import './App.css'
import { RecoilRoot, useRecoilState } from 'recoil';
import { todosAtomFamily } from './atoms';

function App() {
  return <RecoilRoot>
    <Todo id={1} />
    <Todo id={2} />
    <Todo id={3} />
    <Todo id={4} />
    <Todo id={5} />
    <Todo id={5} />
    <Todo id={5} />
    <Todo id={5} /> 
    {/* if we add more Todo components here, we will see that the data is fetched only once for each id. */}
  </RecoilRoot>
}

function Todo({ id }) {
  const [todo, setTodo] = useRecoilState(todosAtomFamily(id));

  return (
    <>
      {todo.title}
      {todo.description}
      <br />
    </>
  )
}

export default App
