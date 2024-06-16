
import './App.css'
import { atom, RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { todosAtomFamily } from './atoms.js';
import { TODOS } from './todos';
import { useEffect } from 'react';

// atomFamily is a function that returns an atom. It takes an object as an argument with the following keys:
// key: A unique string used to identify the atom.
// default: A function that returns the default value of the atom. The function takes an argument that is used to identify the atom.
// In this example, we are using the atomFamily function to create an atom for each todo item. The key is set to 'todosAtomFamily' and the default value is set to a function that returns the todo item with the given id. The id is used to identify the atom. we can create, read, update, and delete todo items using the atomFamily atom.
// simply put, atomFamily is a way to create multiple atoms with the same structure but different values. or create atoms dynamically. or creating atom from each component.

function App() {
  return <RecoilRoot>
    <UpdateTodoAtom id={2} />
    <Todo id={1} />
    <Todo id={2} />
    <Todo id={2} />
  </RecoilRoot>
}

function UpdateTodoAtom({id}){
  const setTodo = useSetRecoilState(todosAtomFamily(id))
  const onclickhandler = () => {
    setTimeout(() => {
      setTodo({
        id: id,
        title: 'updated title',
        description: 'updated description'
      })
    }, 2000)
  }
  return (<button onClick={onclickhandler}>Update Todo</button>)
}

function Todo({ id }) {
  const todo = useRecoilValue(todosAtomFamily(id))
  return (
    <>
      {todo.title}
      {todo.description}
      <br />
    </>
  )
}

export default App
