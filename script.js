let x = null;
let y = null;
let operator = '';
let operatorBool = false;
let operatorPressed = false;

const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.textContent >= '0' && button.textContent <= '9') {
            handleNumbers(button);
        } else if (button.textContent === '+' || button.textContent === '-' || button.textContent === '*' || button.textContent === '/'){
            handleOperators(button);
        } else if (button.textContent === '='){
            handleEquals();
        } else if (button.textContent === 'C') {
            handleClear();
        }
    });
});

function handleNumbers(button) {
    render(button);  // Render the button press

    if (!operatorBool) {
        // Append the number as a string for now, so multi-digit numbers can be formed
        if (x === null) {
            x = button.textContent;  // Start with the first number
        } else {
            x += button.textContent;  // Append to the number if it's not null
        }
    } else {
        operatorPressed = false;
        // For the second number (after an operator)
        if (y === null) {
            y = button.textContent;  // Start with the second number
        } else {
            y += button.textContent;  // Append to the second number
        }
    }
}

function handleOperators(button) {
    if (!operatorPressed){
        handleEquals();
        operator = button.textContent;
        operatorBool = true;  // Now waiting for the second number
        render(button);  // Display the operator
        operatorPressed = true;
    }
}

function handleEquals() {
    if (x !== null && y !== null) {
        const result = operate(Number(x), Number(y), operator);
        display.textContent = result.toString();  // Display the result
        x = result.toString();  // Store the result as the first number for further calculations
        y = null;  // Clear the second number
        operatorBool = false;  // Reset operator waiting state
    }
}

function handleClear() {
    x = null;
    y = null;
    operator = '';
    operatorBool = false;
    operatorPressed = false;
    display.textContent = '0';  // Clear the display
}

function operate(x, y, operator) {
    let total = 0;
    switch (operator) {
        case '+':
            total = add(x, y);
            break;
        case '-':
            total = subtract(x, y);
            break;
        case '*':
            total = multiply(x, y);
            break;
        case '/':
            total = divide(x, y);
            break;
    }
    return total;
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        return 'ERROR';  // Handle division by zero
    }
    return x / y;
}

function render(content) {
    if (display.textContent === '0') {
        display.textContent = content.textContent;
    } else {
        display.textContent += content.textContent;
    }
}