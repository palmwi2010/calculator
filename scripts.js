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
            rowDiv.appendChild(button);
        }
        calculatorBody.appendChild(rowDiv);
    }
}

init();