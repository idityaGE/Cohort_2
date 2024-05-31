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


const array: number[] = [1, 2, 3, 4, 5];
const array2: string[] = ["a", "b", "c", "d", "e"];
function printArray<T>(arr: T[]): void {
  arr.forEach((element) => {
    console.log(element);
  });
} 
printArray<number>(array);
printArray<string>(array2);


function print<T>(arg: T): T {
  console.log(arg);
  return arg;
}
let output = print<string>("Aditya");
let output2 = print(21); //compiler to infer the type of the argument

interface User23 {
  name: string;
  age: number;
}
let output3 = print<User23>({ name: "Aditya", age: 21 });

type Product = {
  name: string;
  price: number;
}
let output4 = print<Product>({ name: "Laptop", price: 50000 });


function print2<T, U>(arg1: T, arg2: U): void {
  console.log(arg1, arg2);
}
print2<string, number>("Aditya", 21);
print2("Aditya", 21); //compiler to infer the type of the argument

//arrow function
const getProducts = <T>(products: T[]): T[] => {
  return products;
}

function getVal<T extends number, U>(valOne: T, valTwo: U): object {
  return {
    valOne,
    valTwo
  };
}
// console.log(getVal("Aditya",21)); //error because T should be a number
console.log(getVal(21, "Aditya")); //we also add constraint on U also 


interface db {
  connection: string;
  username: string;
  password: string;
}
function getDb<T, U extends db>(arg1: T, arg2: U): object {
  console.log(arg2.connection);
  return {
    arg1,
    arg2
  };
}
let connectioStatus = getDb("Aditya", { connection: "localhost", username: "root", password: "root" });
console.log(connectioStatus); //{ arg1: 'Aditya', arg2: { connection: 'localhost', username: 'root', password: 'root' } }



//generic with classes
interface Quiz {
  name: string,
  type: string
}
interface Couse {
  name: string,
  author: string,
  subject: string,
  price?: number
}
class Sellable<T> {
  public cart: T[] = [];
  constructor(cart: T[]) {
    this.cart = cart;
  }
  addToCart(item: T): void {
    this.cart.push(item);
  }
}
let quiz = new Sellable<Quiz>([{ name: "Quiz1", type: "MCQ" }]);
quiz.addToCart({ name: "Quiz2", type: "MCQ" });
console.log(quiz.cart); //[ { name: 'Quiz1', type: 'MCQ' }, { name: 'Quiz2', type: 'MCQ' } ]

let course = new Sellable<Couse>([{ name: "Course1", author: "Aditya", subject: "TS", price: 1000 }]);
course.addToCart({ name: "Course2", author: "Aditya", subject: "TS" });
console.log(course);  //Sellable { cart: [ { name: 'Course1', author: 'Aditya', subject: 'TS', price: 1000 }, { name: 'Course2', author: 'Aditya', subject: 'TS' } ] }


