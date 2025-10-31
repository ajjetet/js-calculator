// 1. Creating buttons and displaying
const keys = ["1", "2", "3", "c", "4", "5", "6", "+", "7", "8", "9", "-", "/", "0", "*", ".", "00", "="];
const keysContainer = document.querySelector(".js-keys-container");

function displayKeys() {
  keys.map((key) => {
    const keyClass = (key === "00" || key === "=") 
    ? "js-button calculator-button twoColumn" 
    : "js-button calculator-button";
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
  if(isCalculationMade) {
    clearScreen();
    expressionElement.innerHTML = html;
  } else {
    expressionElement.innerHTML += html;
  }
}





function checkAndCreateExpression(value) {
  if(value === "c") {
    clearScreen();
  } else if(value === "=") {
    performCalculation();
  } else if (["+", "-", "/", "*"].includes(value)) {
    if (isCalculationMade) {
      isCalculationMade = false;
      expressionElement.innerHTML = resultElement.innerHTML;
      const html = `
      <div class="js-number"
      data-button-value=${value}>${value === "*"
        ? "x"
        : value
      }</div>
    `
    expressionElement.innerHTML += html;
    } else {
      createExpression(value);
    }
  } else {
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
  if(!isCalculationMade) {
    let result = 0;
    let expression = resultElement.innerText;
    document.querySelectorAll(".js-number")
      .forEach((number) => {
        expression += number.dataset.buttonValue;
      });
    console.log(expression);
    result = math.evaluate(expression);
    resultElement.innerHTML = result;
  }
  isCalculationMade = true;
}








// 4. making keyboard buttons interactive
document.body.addEventListener('keydown', (event) => {
  if(keys.includes(event.key)) {
    checkAndCreateExpression(event.key);
  } else if(event.key === 'Backspace') {
    erase();
  }
});

// 5. backspace
function erase() {
  const numbers = document.querySelectorAll(".js-number");
  if(numbers.length > 0) {
    numbers[numbers.length -1].remove();
  }
}






// 6. light
let isLightOn = false;
const lightSwitch = document.querySelector('.js-light');
const screen = document.querySelector('.js-screen');

lightSwitch.addEventListener('click', () => {
  if(isLightOn) {
    screen.style.backgroundColor = '#222';
    isLightOn = false;
  } else {
    screen.style.backgroundColor = 'blue';
    isLightOn = true;
  }
});