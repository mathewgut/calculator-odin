const container = document.createElement('div');
const display = document.createElement('div');
const displayText = document.createElement('p');
const buttonContainer = document.createElement('div');

const operators = ['AC','+/-','%','/','*','-','+','='];
let currentInput = []


display.setAttribute('class','display');
display.setAttribute('id','screen');
container.setAttribute('class','container');
displayText.setAttribute('id','display-text');
buttonContainer.setAttribute('class','button-container');



document.addEventListener("DOMContentLoaded", () => {
    createButtonGrid();
    setButtonValues();
  });



function operate(numOne, operation, numTwo){}
function isOperator(inputString){
    if (isNaN(inputString)){
        if(operators.indexOf(inputString) !== -1){
            return true;
        }
    }
    return false
};

function processInput (input){
    
    let combineNum = (num, position) => {
        currentInput[position] = currentInput[position] + num;
        console.log('combined', currentInput[position]);
    };
    let swapOperator = (unit, position) => {
        console.log('unit', unit, 'position', position, 
            'current value', currentInput[position]);
        currentInput[position] = unit;

    };
    let clearInput = () => {currentInput = []};
    let updateDisplay = () => {
        const output = currentInput.join(' ');
        displayText.textContent = output;
    };
    let getLastInputIndex = () => currentInput.length-1;
    let getLastInputType = (unit) => {
        if (isOperator(currentInput[currentInput.length-1])){
            return 'operator';
        }else {
            return 'number';
            }
        }
    
    // if the user clicks AC, empty the list
    if(input == 'AC'){
            clearInput();
    }
    // adding input to array based on current length of array
    switch(currentInput.length){
        case 0:
            // do nothing if operator, add if num
            if (isOperator(input)){
                console.log('operator at 0 length');
                console.log(currentInput);
                break;
            }
            else {
                console.log('number at 0 length');
                currentInput.push(input);
                console.log(currentInput);
                break;
            }
        case 1:
            if (isOperator(input)){ // if an operator
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
                operate();
                break;
            }
            else if (isOperator(input)){
                operate();
                currentInput.push(input);
                break;
            }else{
                combineNum(input, getLastInputIndex());
                break;
            }
    }

    updateDisplay();
}

// sets button textcontent based on button id's so it can be used as input
// for math operations

function setButtonValues(){
    
    const buttonID = ['input-0-0', 'input-1-0', 'input-2-0','input-3-0',
        'input-3-1','input-3-2','input-3-3','input-3-4'];

    const numberValues = ['0','0','.','1','2','3','4','5','6','7','8','9'];
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

// creates the grid of divs we use as buttons and assigns them each
// an id associated with their x and y value for easier targeting
// input-x-y

function createButtonGrid(){
    const totalHeight = 500;
    const totalWidth = 450;

    for(let rows = 0; rows < 5; rows++){
        const row = document.createElement('div');

        row.setAttribute('id',`row-${rows}`)
        row.setAttribute('class','row');

        for(let inputs = 0; inputs < 4; inputs++){
            const input = document.createElement('div');

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
    processInput(target.textContent);
})


display.appendChild(displayText);
container.appendChild(display);

document.body.appendChild(container);





