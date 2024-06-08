//! Pick API

interface User {
  id: string;
  name: string;
  age: number;
  password: string;
  email: string;
}

// we want to update only name, age, email of the user but dont want to create another interface for that there we can use Pick API

// Pick : pick the keys from the object and create a new object with those keys only
// syntax: Pick<T, K> 
type UpdateProps = Pick<User, 'name' | 'age' | 'email'>
type unUpdate = Pick<User, 'id' | 'password'>

function updateUser(updateProps: UpdateProps) {
  // database update logic
}


//! Partial API

// we want to update the user but user might not want to update all the fields so we can make all the fields optional here we have to options either we can make all the fields optional in the interface or we can use Partial API
interface User1 {
  name?: string;
  age?: number;
  email?: string;
}

// OR

// Partial: make all the keys in the object optional
// syntax: Partial<T>
type updateUser = Partial<UpdateProps>

function updateUser1(updateProps: updateUser) {
  // database update logic
}


//! Readonly API

// we want to make the object readonly so that no one can update the object so we can use Readonly API
// Readonly: make all the keys in the object readonly
interface User2 {
  name: string;
  age: number;
  email: string;
}
// OR
type readOnlyUser = Readonly<User2 | User1>

const user: Readonly<User2> = {
  name: 'John',
  age: 30,
  email: 'mail@mail.com'
}
// user.name = 'Doe' //* error


//! Record API

// we want to create a object with key value pair so we can use Record API
// Record: create an object with key value pair
// syntax: Record<K, T>  // K is key and T is value

// Assume you want to create an object with key as string and value as object
interface User3 {
  name: string;
  age: number;
  email: string;
}
type User4 = {
  [key: string]: User3
}
const users: User4 = {
  '1': {
    name: 'John',
    age: 30,
    email: '@'
  },
  '2': {
    name: 'Doe',
    age: 40,
    email: '@'
  }
}
// This above code is little bit complex so we can use Record API

type User5 = Record<string, User3>
// OR
type User6 = Record<number, { name: string; age: number; email: string }>

const users1: User5 = {
  '1': {
    name: 'John',
    age: 30,
    email: '@'
  },
  '2': {
    name: 'Doe',
    age: 40,
    email: '@'
  }
}


//! Map API

//* Map is a javascript feature which is used to map the keys of the object
const user4 = new Map()
user4.set('name', 'John')
user4.set('age', 30)
user4.set('email', '@')
user4.set('password', '123')
user4.set('address', { city: 'NY', state: 'NY' })

console.log(user4) 
console.log(user4.get('name')) // John

user4.delete('password')
console.log(user4)
// but in the above code we are using Map to generate the object but type of the object is not defined so we can use Map API in typescript to define the type of the object

// Map API is similar to Record API but it is used for mapping the keys of the object
// Map: map the keys of the object
// syntax: Map<T, U>  // T is object and U is new keys
type UserMap = {
  name: string;
  age: number;
  email: string;
}
const user9 = new Map<string, UserMap>()
user9.set('john', { name: 'John', age: 30, email: '@' })
user9.set('doe', { name: 'Doe', age: 40, email: '@' })
user9.set('smith', { name: 'Smith', age: 50, email: '@' })

console.log(user9)



//! Exclude API

// we want to exclude some keys from the object so we can use Exclude API
// Exclude: exclude the keys from the object
// syntax: Exclude<T, U>  // T is object and U is keys to exclude
type Eventtype = 'click' | 'mouseover' | 'mouseenter' | 'mouseleave';
type ExcludeEvent = Exclude<Eventtype, 'click' | 'mouseover'>
// ExcludeEvent will be 'mouseenter' | 'mouseleave'
const handleEvent = (event: ExcludeEvent): void => {
  // handle event logic
  console.log(`Event: ${event}`)
}
handleEvent('mouseenter');
// handleEvent('click') //* error

//! Extract API

// we want to extract some keys from the object so we can use Extract API
// Extract: extract the keys from the object
// syntax: Extract<T, U>  // T is object and U is keys to extract

interface User8 {
  name: string;
  age: number;
  email: string;
}
type ExtractUser = Extract<keyof User8, 'email'>

// ExtractUser will be 'email'
// what if we want to extract multiple keys then we can use union
type ExtractUser1 = Extract<keyof User8, 'email' | 'name'>

const user8: ExtractUser = "email"


//! Omit API

// we want to omit some keys from the object so we can use Omit API
// Omit: omit the keys from the object
// syntax: Omit<T, K>  // T is object and K is keys to omit
interface User9 {
  name: string;
  age: number;
  email: string;
}
type OmitUser = Omit<User9, 'email'>

// OmitUser will be { name: string; age: number; }
const user10: OmitUser = {
  name: 'John',
  age: 30
}


//! Required API

// we want to make all the keys in the object required so we can use Required API
// Required: make all the keys in the object required
// syntax: Required<T>
interface User10 {
  name?: string;
  age?: number;
  email?: string;
}
type RequiredUser = Required<User10>

// RequiredUser will be { name: string; age: number; email: string; }
const user11: RequiredUser = {
  name: 'John',
  age: 30,
  email: '@'
}


//! NonNullable API

// we want to make all the keys in the object non nullable so we can use NonNullable API
// NonNullable: make all the keys in the object non nullable
// syntax: NonNullable<T>
interface User11 {
  name: string | null;
  age: number | null;
  email: string | null;
}
type NonNullableUser = NonNullable<User11>

// NonNullableUser will be { name: string; age: number; email: string; }
const user12: NonNullableUser = {
  name: 'John',
  age: 30,
  email: '@'
}


