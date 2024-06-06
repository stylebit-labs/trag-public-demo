globalCounter = 0;

function incrementCounter() {
  globalCounter++;
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

function unusedFunction() {
  
}

const unusedVariable = "This variable is not used.";

const num: number = 0; // Fixed to match the type

const result = sum(10, 20, 30);

for (let i = 0; i < "5"; i++) {
  console.log(i);
}