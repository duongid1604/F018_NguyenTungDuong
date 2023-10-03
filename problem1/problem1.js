// Method 1: Loop

const sumUsingLoop = (n) => {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};

// Method 2: Recursion

const sumUsingRecursion = (n) => {
  if (n === 1) {
    return 1;
  }

  if (n !== 1) {
    return n + sumUsingRecursion(n - 1);
  }
};

// Method 3: Formula

const sumUsingFormula = (n) => {
  return (n * (n + 1)) / 2;
};

console.log(sumUsingLoop(5));
console.log(sumUsingRecursion(5));
console.log(sumUsingFormula(5));
