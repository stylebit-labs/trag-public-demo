// Global variables
let globalCounter = 0;

function incrementCounter() {
  globalCounter++;
}

// Repeated code
function sum(a: number, b: number) {
  return a + b;
}

function multiply(a: number, b: number) {
  return a * b;
}

// Exposes environment variables
const apiKey = process.env.API_KEY;

// Wrong algorithm
function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Unused function
function unusedFunction() {
  console.log("This function is not used anywhere.");
}

// Unused variable
const unusedVariable = "This variable is not used.";

// Type mismatch
const num: number = "This should be a number";

// Incorrect function call
const result = sum(10, 20, 30);

// Incorrect loop condition
for (let i = 0; i < "5"; i++) {
  console.log(i);
}
