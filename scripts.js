let init = () => {
    const calculatorBody = document.querySelector('.calculator-body');

    // Config for buttons
    let rows = 5;
    let cols = 4;
    let counter = 1;
    const topRow = ['AC', '+/-', '%', '/']
    const bottomRow = ['0', '.', 'ans', '='];
    const rightMiddle = ['*', '-', '+'];

    for (let i = 0; i < rows; i++) {
        let rowDiv = document.createElement('div');
        rowDiv.classList.add('row-div')

        for (let j = 0; j < cols; j++) {

            if (i === rows - 1 && j === cols - 2) continue;

            let character = document    .createElement('p');
            character.classList.add('char');

            let button = document.createElement('div');
            button.classList.add('button');
            if (i === 0) { // Row one
                character.innerText = topRow[j];
                if (j < cols - 1) {
                    button.classList.add('top-operator');
                } else {
                    button.classList.add('operator');
                }
            } else if (i === rows - 1) { // Final row
                character.innerText = bottomRow[j];
                if (j < cols - 1) {
                    button.classList.add('number');
                } else {
                    button.classList.add('operator');
                }
            } else {
                if (j === cols -1) {
                    button.classList.add('operator');
                    character.innerText = rightMiddle[i - 1];
                } else {
                    character.innerText = counter;
                    counter++;
                    button.classList.add('number');
                }
            }
            button.appendChild(character);
            if (i === 4) {
                let calculatedHeight = document.querySelector('.button').clientHeight;
                let calculatedWidth = document.querySelector('.button').clientWidth;
                button.style.height = calculatedHeight + 'px';
                if (j != 0) button.style.maxWidth = calculatedWidth + 'px';
            }
            rowDiv.appendChild(button);
        }
        calculatorBody.appendChild(rowDiv);
    }
}

// Operations
let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a,b) => a/b;

let operate = (operation, a, b) => {

    // Try and convert to Float
    try {
        a = parseFloat(a);
        b = parseFloat(b);
    } catch (error) {
        return 'n/a';
    }

    switch (operation) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

let total = '';
let latch = '';
let operator = '';
let justEqualed = false;

let updateScreen = () => {
    const screen = document.querySelector('.screen');

    // Round to 2 d.p.
    if (total != '') {
        try {
            let totalFloat = parseFloat(total);
            if (totalFloat != ~~totalFloat) total = total.toFixed(2);
        } catch {}
    }

    screen.innerText = total === ''? 0:total;
}

let resetOperators = () => {
    const operators = document.querySelectorAll('.operator');
    for (let i = 0; i < operators.length; i++) {
        operators[i].id = '';
    }
    operator = '';
}

let setActions = () => {

    // Numbers
    const numbers = document.querySelectorAll('.number');

    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', e => {

            if (numbers[i].innerText === '.' && total.includes('.')) return;
            if (numbers[i].innerText === 'ans' && total != '') return;

            if (justEqualed) {
                total = numbers[i].innerText
                justEqualed = false
            } else {
                total = total + numbers[i].innerText;
            }
            updateScreen();
        })
    }

    // Top operators
    const topOperators = document.querySelectorAll('.top-operator');

    for (let i = 0; i < topOperators.length; i++) {
        topOperators[i].addEventListener('click', e => {
            resetOperators();
            let action = topOperators[i].innerText;

            if (action === 'AC') {
                total = '';
                latch = '';
            }
            else { // Either % or inverse
                if (total != '') {
                    try {
                        let temp = parseFloat(total);
                        temp *= (action === '%') ? 0.01:-1
                        total = temp.toString();
                    } catch (error) {}
                }
            }
            updateScreen();
        })
    }

    topOperators[0].addEventListener('click', e => {
        total = '';
        latch = '';
        resetOperators();
        updateScreen();
    })

    // Operators
    const operators = document.querySelectorAll('.operator');

    for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', e => {
            if (total === '' && latch === '') {
                return;
            } 
            if (operators[i].innerText != '=') { // Action operator
                resetOperators();
                operators[i].id = 'active-operator';
                if (operator === '') {
                    latch = total;
                    total = '';
                }
                operator = operators[i].innerText;
            }
            else { //Equals operator
                if (operator != '') {
                    total = operate(operator, latch, total);
                    latch = '';
                    resetOperators();
                    updateScreen();
                    justEqualed = true;
                } else {
                    updateScreen();
                }
            }
        })
    }
}



init();
updateScreen();
setActions();