const container = document.createElement('div');
const display = document.createElement('div');
const displayText = document.createElement('p');
const buttonContainer = document.createElement('div');

display.setAttribute('class','display');
display.setAttribute('id','screen');
container.setAttribute('class','container');
displayText.setAttribute('id','display-text');
buttonContainer.setAttribute('class','button-container');

const operators = ['AC','+/-','%','/','*','-','+','='];
let currentInput = []

document.addEventListener("DOMContentLoaded", () => {
    createButtonGrid();
    setButtonValues();
  });

const add = (numOne, numTwo) => numOne + numTwo;
const subtract = (numOne, numTwo) => numOne - numTwo;
const multiply = (numOne, numTwo) => numOne * numTwo;
const divide = (numOne, numTwo) => numOne / numTwo;

const convertToPerecent = num => {
    console.log(num)
    const percent = num/100;
    currentInput[getLastInputIndex()] = percent; 
};

const combineNum = (num, position) => {
    currentInput[position] = currentInput[position] + num;
    console.log('combined', currentInput[position]);
};
const swapOperator = (unit, position) => {
    console.log('unit', unit, 'position', position, 
        'current value', currentInput[position]);
    currentInput[position] = unit;

};
const clearInput = () => {
    currentInput = [];
};

const getLastInputIndex = () => currentInput.length-1;
const getLastInputType = () => {
    if (isOperator(currentInput[currentInput.length-1])){
        return 'operator';
    }else {
        return 'number';
        }
    }

function updateDisplay () {
    if (updateDisplay.arguments[0]){
        displayText.content = updateDisplay.arguments[0];
    }
    const output = currentInput.join('');
    displayText.textContent = output;
};

function operate(numOne, operation, numTwo){
    switch(operation){
        case '+':
            return add(numOne, numTwo);
        case '-':
            return subtract(numOne, numTwo);
        case '/':
            return divide(numOne, numTwo);
        case '*':
            return multiply(numOne, numTwo);
        default:
            return '0';
    }
}
function isOperator(inputString){
    if (isNaN(inputString)){
        if(operators.indexOf(inputString) !== -1){
            return true;
        }
    }
    return false
};

if(NaN in currentInput){
    clearInput();
}

function operatorInput (input){
    switch (input){
        case 'AC':
            clearInput();
            break
        case '%':
            if(getLastInputType() == 'number'){
                convertToPerecent(currentInput[getLastInputIndex()])
                return;
            }
            return;
        case '+/-':
            if(getLastInputType() == 'number'){
                if(currentInput[getLastInputIndex()] > 0){
                    currentInput[getLastInputIndex()] = 
                    '-' + currentInput[getLastInputIndex()];
                    return;
                }
                else if (currentInput[getLastInputIndex()] < 0){
                    currentInput[getLastInputIndex()] = currentInput[getLastInputIndex()].slice(1); 
                    console.log(currentInput[getLastInputIndex()])
                    return;
                }
            }
            return;
        case '=':
            if(currentInput.length < 3){
                return 'invalid'
            }
            break
        case '.':
            if(getLastInputType() == 'number') {
                if(String(currentInput[getLastInputIndex()]).includes('.')){
                    return 'invalid'
                }
            }
            break    
        
    }
}

// should make this an object and the functions should be of an object
// not just randomly inside another function
function processInput (input){

    let sum = operate(Number(currentInput[0]),currentInput[1],Number(currentInput[2]));
    // adding input to array based on current length of array
    switch(currentInput.length){
        case 0:
            // do nothing if operator, add if num
            if (isOperator(input)){
                break;
            }
            else {
                console.log('number at 0 length');
                currentInput.push(input);
                console.log(currentInput);
                break;
            }
        case 1:
            if (isOperator(input)){
                if(getLastInputType(input, getLastInputIndex()) == 'number');
                    currentInput.push(input);
                    console.log(currentInput);
                    break;
                }
            else {
                console.log('else');
                combineNum(input, getLastInputIndex());
                console.log(currentInput);
                break;
            }
        case 2:
            // if operator and last input was operator
            if (isOperator(input)){
                console.log('operator at 2 length');
                if(getLastInputType(input, getLastInputIndex()) == 'operator'){
                    swapOperator(input, getLastInputIndex());
                    console.log(currentInput);
                    break;
                }
            }
            else {
                currentInput.push(input);
                console.log(currentInput);
                break
            }
        case 3:
            if(input == '='){
                if (sum == '0' || sum == NaN){
                    clearInput();
                    return;
                }
                currentInput = [sum];
                break;
            }
            else if (isOperator(input)){
                if (sum == '0' || sum == NaN){
                    clearInput();
                    return;
                }
                currentInput = [sum];
                currentInput.push(input)
                break;
            }else{
                combineNum(input, getLastInputIndex());
                break;
            }
    }

}

// sets button textcontent based on button id's so it can be used as input
// for math operations

function setButtonValues(){
    // id's of buttons to which operators will be assigned
    const buttonID = ['input-0-0', 'input-1-0', 'input-2-0','input-3-0',
        'input-3-1','input-3-2','input-3-3','input-3-4'];
    // values for number buttons
    const numberValues = ['0','0','.','1','2','3','4','5','6','7','8','9'];
    // ids of number buttons to assign values to
    const numberButtonID = ['input-0-4','input-1-4','input-2-4','input-0-3',
        'input-1-3','input-2-3','input-0-2','input-1-2','input-2-2','input-0-1','input-1-1','input-2-1'];

    for(let i = 0; i < 8; i++){
        const operatorButton = document.getElementById(buttonID[i]);
        operatorButton.classList.add('operator-button');
        operatorButton.textContent = operators[i];
    }

    for(let j = 0; j < numberValues.length; j++){
        const numberButton = document.getElementById(numberButtonID[j]);
        numberButton.classList.add('number-button');
        numberButton.textContent = numberValues[j]
    }
}

// creates the grid of buttons and assigns them each
// an id associated with their x and y value for more logical targeting
// input-x-y

function createButtonGrid(){
    const totalHeight = 400;
    const totalWidth = 300;

    for(let rows = 0; rows < 5; rows++){
        const row = document.createElement('div');

        row.setAttribute('id',`row-${rows}`)
        row.setAttribute('class','row');

        for(let inputs = 0; inputs < 4; inputs++){
            const input = document.createElement('button');

            input.setAttribute('id',`input-${inputs}-${rows}`)
            input.setAttribute('class','input-buttons');

            input.style.height = (totalHeight/5+'px');
            input.style.width = (totalWidth/4+'px');

            row.appendChild(input);
        }
        buttonContainer.appendChild(row);
    }
    container.appendChild(buttonContainer);
}


buttonContainer.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target.textContent)
    // in case user enters invalid use of operator
    if(operatorInput(target.textContent) == 'invalid'){
        return
    };
    processInput(target.textContent);
    updateDisplay()
})


display.appendChild(displayText);
container.appendChild(display);

document.body.appendChild(container);





