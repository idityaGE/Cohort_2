let num: number = 10;

const greet = (name: string): void => {
  console.log(`Hello ${name}`)
}

const sum = (a: number, b: number): number => {
  return a + b
}
const add = sum(4, 7)

function isAdult(age: number): boolean {
  return age > 18
}

const proFun = (fun: () => void): void => {
  setTimeout(fun, 1000)
}
proFun(function () {
  console.log("hello Aditya")
})

interface User {
  firstname: string,
  lastname: string,
  email: string,
  age: number
}

const user: User = {
  firstname: "Aditya",
  lastname: "Maurya",
  email: "am@gmail.com",
  age: 20
}

const isLegal = (user: User): boolean => {
  return user.age >= 18
}

interface Admin {
  name: string,
  email: string,
  age: number,
  greet(phrase: string): void
}

class Person implements Admin {
  name: string;
  email: string;
  age: number;
  constructor(n: string, e: string, a: number) {
    this.name = n;
    this.email = e;
    this.age = a;
  }
  greet(phrase: string): void {
    console.log(`${phrase}, ${this.name}`)
  }
}

type User2 = {
  firstname: string,
  lastname: string,
  email: string,
  age: number
}

interface A {

}

interface B {

}

interface C extends A, B {

}

type E = A & B & C

type users = {
  name: string,
  age: number
}[]

type user8 = (number | string)[]

type user9 = number[] | string[]

type user0 = string[][]

type arrfun = (() => void)[]

type arrtype1 = Array<string | number>;
let myArray3: arrtype1 = ['John', 25];

type jgbker = {
  [key: string]: any
}[]

let signalcolor: "red" | "yellow" | "green" = "green"
signalcolor = "red"

const addi: { name: string }[] = [{ name: "mohit" }, { name: "adii" }]

type todo = {
  readonly id?: number,
  title: string,
  description: string,
  Hobbies: readonly string[],
  getTodo(): string,
  getid: (tile: string) => number
}

type user7 = {

}
type admin = {

}
let user00: user7 | admin;

function red(id: string | number): boolean {
  return true
}


let person: [string, number, boolean];//order of the data type should be same as the order of the data
person = ["John", 25, true];

type User99 = [string, number, boolean][];
let user55: User99 = [["John", 25, true], ["John", 25, true]];


enum Direction {
  Up,     // 0
  Down,   // 1
  Right,  // 2
  Left    // 3
}
console.log(Direction.Up) // 0
console.log(Direction.Right) // 2


enum Direction1 {
  Up = 2,     // 2
  Down,   // 3
  Right,  // 4
  Left    // 5
}

enum Direction2 {
  Up = "up",
  Down = "down",
  Right = "right",
  Left = "left"
}

console.log(Direction2.Down) // 'down'

// Example 
enum ResponseStatus {
  Success = 200,
  NotFound = 404,
  Error = 500
}
// app.get("/', (req, res) => {
//     if (!req.query.userId) {
//   res.status(ResponseStatus.Error).json({})
// }
// // and so on...
// res.status(ResponseStatus.Success).json({});
// })

class Employ {
  public name: string;
  readonly email: string;
  private readonly mobile: number;
  city: string = "mau";
  constructor(name: string, email: string, mobile: number) {
    this.name = name;
    this.email = email;
    this.mobile = mobile;
  }
  introduce() {
    console.log(`helo, my name is ${this.name}`)
  }
}


type Input = number | string
function arr_1(arr: Input[]): Input {
  return arr[0]
}

function Identity<T>(arg:T):T{
  return arg
}
const idd = Identity<string>("576948");
const idd1 = Identity<number>(576948);

