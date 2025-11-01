// 1. Creating buttons and displaying
const keys = ["1", "2", "3", "x", "4", "5", "6", "c", "7", "8", "9", "+", "/", "0", "*", "-", "00", ".", "="];
const keysContainer = document.querySelector(".js-keys-container");

function displayKeys() {
  keys.map((key) => {
    let keyClass = '';
    if (key === 'x') {
      keyClass = 'js-clear-button calculator-button'
    } else if (key === '00') {
      keyClass = 'js-button calculator-button twoColumn'
    } else if (key === 'c') {
      keyClass = 'js-button calculator-button c-button'
    } else {
      keyClass = 'js-button calculator-button'
    }

    const html =
      `
      <button class="${keyClass}"
      value=${key}
      >${key === "*"
        ? "x"
        : key
      }</button>
    `
    keysContainer.innerHTML += html;
  });
}

displayKeys();


// 2. Making button interactive
const expressionElement = document.querySelector(".js-expression");
const resultElement = document.querySelector(".js-result");
const buttons = document.querySelectorAll(".js-button");
let isCalculationMade = false;

function clearScreen() {
  expressionElement.innerHTML = "";
  resultElement.innerHTML = "";
  isCalculationMade = false;
}

function createExpression(value) {
  const html = `
  <div class="js-number"
  data-button-value=${value}>${value === "*"
      ? "x"
      : value
    }</div>
  `
  if (isCalculationMade) {
    clearScreen();
    expressionElement.innerHTML = html;
  } else {
    expressionElement.innerHTML += html;
  }
}

// check expression limit
function checkLimit() {
  const firstChildElement = expressionElement.firstElementChild || '';
  if(firstChildElement) {
    if(firstChildElement.innerText.length + expressionElement.children.length >= 24) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}


function checkAndCreateExpression(value) {
  if (value === "c") {
    clearScreen();
  } else if (value === "=") {
    performCalculation();
  } else if (["+", "-", "/", "*"].includes(value)) {
    if(resultElement.innerText === 'Error') {
      return;
    }

    if (isCalculationMade) {
      isCalculationMade = false;
      expressionElement.innerHTML = `
        <div class="js-number" data-button-value=${resultElement.innerText}>
          ${resultElement.innerHTML}
        </div>
      `;
      const html = `
      <div class="js-number"
      data-button-value=${value}>${value === "*"
          ? "x"
          : value
        }</div>
    `
      expressionElement.innerHTML += html;
    } else {
      const expressionLimit = checkLimit();
      if(expressionLimit) {
        return;
      }
      createExpression(value);
    }
  } else {
      const expressionLimit = checkLimit();
      if(expressionLimit) {
        return;
      }
    createExpression(value);
  }
}


buttons.forEach((button) => {
  button.addEventListener('click', () => {
    checkAndCreateExpression(button.value);
  })
});


// 3. Performing Calculations
function performCalculation() {
  if (!isCalculationMade) {
    let result = 0;
    let expression = '';
    document.querySelectorAll(".js-number")
      .forEach((number) => {
        expression += number.dataset.buttonValue;
      });
    try {
      result = math.evaluate(expression);
    } catch (error) {
      console.log(error);
      result = 'Error'
    }
    resultElement.innerHTML = result;
  }
      isCalculationMade = true;
}


// 4. making keyboard buttons interactive
document.body.addEventListener('keydown', (event) => {
  if(event.key === 'Enter' || event.key === '=') {
    performCalculation();
  } else if(event.key === 'Backspace') {
    erase();
  } else if(keys.includes(event.key)) {
    checkAndCreateExpression(event.key);
  }
});

// 5. backspace
function erase() {
  if(isCalculationMade) {
    return;
  }
  const numbers = document.querySelectorAll(".js-number");
  if (numbers.length > 0) {
    numbers[numbers.length - 1].remove();
  }
}


// backspace with button
const backspaceBtnElem = document.querySelector('.js-clear-button');
backspaceBtnElem.addEventListener('click', () => {
  if(!isCalculationMade) {
    erase();
  }
});



// 6. light
let isLightOn = false;
const lightSwitch = document.querySelector('.js-light');
const screen = document.querySelector('.js-screen');

lightSwitch.addEventListener('click', () => {
  if (isLightOn) {
    screen.style.backgroundColor = '#222';
    isLightOn = false;
  } else {
    screen.style.backgroundColor = 'blue';
    isLightOn = true;
  }
});
