const tol = 1e-5;

const add = (a,b) => {
  a = parseFloat(a);
  b = parseFloat(b);
  return (a+b);
}

const subtract = (a,b) => {
  a = parseFloat(a);
  b = parseFloat(b);
  return (a-b);
}

const multiply = (a,b) => {
  a = parseFloat(a);
  b = parseFloat(b);
  return (a*b);
}

const divide = (a,b) => {
  a = parseFloat(a);
  b = parseFloat(b);
  if (Math.abs(b) <= tol) return '👁👄👁';
  return (a/b);
}

const operate = (a, b, operation) => {
  switch (operation) 
  {
    case '+':
      return add(a, b);

    case '-':
      return subtract(a, b);

    case '*':
      return multiply(a, b);

    case '/':
      return divide(a, b);
    
    default:
      return '👁👄👁';
  }
}


