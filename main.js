// Auxiliary global constants
const tol = 1e-5;
const numberDecimals = 3; 

// global DOM elements
const displayMain = document.querySelector('.dspl-main');
const displayHistory = document.querySelector('.dspl-history');
const historyFirstLine = document.querySelector('.first-line');
const historySecondLine = document.querySelector('.second-line');
const historyThirdLine = document.querySelector('.third-line');

// Global auxiliary state flags
let recentEqual = false;

// Global variables
let transitionTime = 200;
let firstOperand = '';
let activeValue = '0';
let activeOperation = '';
let history = {
  oldest: '',
  newest: ''
}
let historyCicle = [historyFirstLine, historySecondLine, historyThirdLine];

// Auxliary functions for history managment
const cicleHistory = () => {
  const aux = historyCicle[0];
  historyCicle[0] = historyCicle[1];
  historyCicle[1] = historyCicle[2];
  historyCicle[2] = aux;

  historyCicle[2].classList.add('transition-none');
  historyCicle[2].style.top = '100%';
  historyCicle[2].style.bottom = '-50%';
  setTimeout(() => historyCicle[2].classList.remove('transition-none'), transitionTime);
}

const positionHistory = () => {
  historyCicle[0].style.top = '-50%';
  historyCicle[0].style.bottom = '100%';

  historyCicle[1].style.top = '0%';
  historyCicle[1].style.bottom = '50%';

  historyCicle[2].style.top = '50%';
  historyCicle[2].style.bottom = '0%';
}

const addHistory = calulation => {
  history.oldest = history.newest;
  history.newest = calulation;
  historyCicle[1].textContent = history.oldest;
  historyCicle[2].textContent = history.newest;
  positionHistory();
  setTimeout(cicleHistory, transitionTime);
}

const manageHistory = (result = 0, clear = true) => {
  if (clear) {
    historyCicle.forEach(item => item.textContent = '');
    history.oldest = '';
    history.newest = '';
  }
  else addHistory(displayMain.textContent + ' = ' + result.toString());
} 
// Auxiliary funcrions for calculations

// Round numbers
const roundNumber = (number, ndec) => {
  return (Math.round((number + Number.EPSILON) * (10 ** ndec)) / (10 ** ndec));
}

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
  let result = 0;
  switch (operation) 
  {
    case ' + ':
      result =  add(a, b);
      break;
    case ' - ':
      result =  subtract(a, b);
      break;
    case ' * ':
      result =  multiply(a, b);
      break;
    case ' / ':
      result =  divide(a, b);
      break;
    case ' % ':
      result =  percent(a, b);
      break;
    default:
      result =  '👁👄👁';
      break;
  }
  return roundNumber(result, numberDecimals);
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