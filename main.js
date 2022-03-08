// Auxiliary global constants
const tol = 1e-5;

// global DOM elements
const displayMain = document.querySelector('.dspl-main');
const displayHistory = document.querySelector('.dspl-history');

// Global auxiliary state flags
let recentEqual = false;

// Global variables
let firstOperand = '';
let activeValue = '0';
let activeOperation = '';

// Basic operations functions
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

// History manager
const manageHistory = (result = 0, clear = true) => {
  if (clear) displayHistory.textContent = '';
  else displayHistory.textContent = displayMain.textContent + ' = ' + result.toString();
} 

// Button callback
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
      manageHistory(result, false);
      firstOperand = '';
      activeValue = result.toString();
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
      manageHistory(result, false);
      firstOperand = '';
      activeOperation = '';
      activeValue = result.toString();
    }
  } else if (button.classList.contains('btn-clear')) {
    firstOperand = '';
    activeOperation = '';
    activeValue = '0';
    recentEqual = false;
    manageHistory();
  } else if (button.classList.contains('btn-sign')) {
    if(activeValue === '👁👄👁' || activeValue === '' || activeValue === '0' || recentEqual) return;
    activeValue *= -1;
  } else if (button.classList.contains('btn-decimal')) {
    if(activeValue === '👁👄👁' || activeValue === '' || activeValue.includes('.') || recentEqual) return;
    activeValue += button.textContent;
  } else if (button.classList.contains('btn-del')) {
    if(activeValue === '👁👄👁' || recentEqual || (activeOperation === '' && firstOperand === '' && (activeValue === '' || activeValue === '0'))) return;
    if(activeOperation !== '' && activeValue === '') {
      activeValue = firstOperand;
      activeOperation = '';
      firstOperand = '';
    }else {
      activeValue = activeValue.slice(0, activeValue.length-1);
      if (activeValue === '' && activeOperation === '') activeValue = '0';
    }
  }
  displayMain.textContent = firstOperand + activeOperation + activeValue;
}

// Callback event listeners set
const buttons = document.querySelectorAll('.button');
buttons.forEach (button => button.addEventListener('click', buttonClickEvent));
