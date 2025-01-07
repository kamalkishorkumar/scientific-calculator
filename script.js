// Reference to the display input field
const display = document.getElementById('display');

// Function to append values (numbers, operators, functions) to the display
function appendValue(value) {
    display.value += value;
}

// Function to clear the display (reset the input)
function clearDisplay() {
    display.value = '';
}

// Function to calculate the result
function calculateResult() {
    try {
        // Remove any unnecessary spaces and check for invalid expressions
        const expression = display.value.replace(/\s+/g, '');
        
        // Check if the expression ends with an operator or has consecutive operators
        if (/[*+\-/]{2,}/.test(expression) || /[*+\-/]$/.test(expression)) {
            throw new Error('Invalid Expression');
        }
        
        // Evaluate the expression and display the result
        const result = Function(`"use strict"; return (${expression})`)();
        
        // Check for division by zero or other edge cases
        if (result === Infinity || result === -Infinity) {
            throw new Error('Division by Zero');
        }
        
        display.value = result;
    } catch (error) {
        // Show an alert and clear the display in case of an error
        alert(error.message);
        clearDisplay();
    }
}

// Add keyboard support for the calculator
window.addEventListener('keydown', (event) => {
    const allowedKeys = '0123456789.+-*/()';  // Keys that are allowed for input
    
    // Append value if the key pressed is valid
    if (allowedKeys.includes(event.key)) {
        appendValue(event.key);
    }
    // Calculate the result if Enter is pressed
    else if (event.key === 'Enter') {
        calculateResult();
    }
    // Delete the last character if Backspace is pressed
    else if (event.key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    }
    // Clear the display if Escape is pressed
    else if (event.key === 'Escape') {
        clearDisplay();
    }
});
