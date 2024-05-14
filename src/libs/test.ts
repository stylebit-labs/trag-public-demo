counter = 0;

function incrementCounter() {
  counter++;
}

function sum(a: number, b: number) {
  return a + b;
}

function multiply(a: number, b: number) {
  return a * b;
}

const apiKey = process.env.API_KEY;

function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function myFunction() {
  console.log("This is my function.");
}

const myVariable = "This is my variable";


const num: number = "my string";

const result = sum(10, 20, 30);

for (let i = 0; i < "5"; i++) {
  console.log(i);
}
