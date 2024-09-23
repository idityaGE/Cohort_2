/*
  if I want to mock this file, I need to create a `__mocks__` on the same level as the file I want to mock and inside it create a file with the same name as the file I want to mock, in this case `index.ts` and then I can mock the file like this:
*/

export const users = () => ({
  name: 'John Doe',
  age: 30,
})