// Auxiliary global constants
const tol = 1e-5;

// global DOM elements
const display = document.querySelector('.display');

// Global auxiliary state flags
let recentEqual = false;

// Global variables
let firstOperand = '';
let activeValue = '0';
let activeOperation = '';

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

const percent = (a,b) => {
  a = parseFloat(a);
  b = parseFloat(b);
  return(a*b*0.01);
}
 
const operate = (a, b, operation) => {
  switch (operation) 
  {
    case ' + ':
      return add(a, b);

    case ' - ':
      return subtract(a, b);

    case ' * ':
      return multiply(a, b);

    case ' / ':
      return divide(a, b);

    case ' % ':
      return percent(a, b);

    default:
      return '👁👄👁';
  }
}

const buttonClickEvent = event => {
  const button = event.target;
  if (button.classList.contains('number'))
  {
    if (recentEqual)
    {
      activeValue = button.textContent;
      recentEqual = false;
    }
    else if (activeValue === '0') activeValue = button.textContent;
    else activeValue += button.textContent;
  } else if(button.classList.contains('operate')) {
    if(activeValue === '👁👄👁') return;
    if(firstOperand !== '' && activeValue !== '' && activeOperation !== '') {
      const result = operate(firstOperand, activeValue, activeOperation);
      firstOperand = '';
      activeValue = result;
    }
    activeOperation = button.textContent;
    if (firstOperand === '') {
      firstOperand = activeValue;
      activeValue = '';
    }
  } else if (button.classList.contains('btn-equal')) {
    if(firstOperand !== '' && activeValue !== '' && activeOperation !== '')
    {
      recentEqual = true;
      const result = operate(firstOperand, activeValue, activeOperation);
      firstOperand = '';
      activeOperation = '';
      activeValue = result;
    }
  } else if (button.classList.contains('btn-clear')) {
    firstOperand = '';
    activeOperation = '';
    activeValue = '0';
    recentEqual = false;
  }
  display.textContent = firstOperand + activeOperation + activeValue;
}

const buttons = document.querySelectorAll('.button');
buttons.forEach (button => button.addEventListener('click', buttonClickEvent));
