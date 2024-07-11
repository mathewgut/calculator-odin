const container = document.createElement('div');
const display = document.createElement('div');
const displayText = document.createElement('p');
const buttonContainer = document.createElement('div');

display.setAttribute('class','display');
display.setAttribute('id','screen');
container.setAttribute('class','container');
displayText.setAttribute('id','display-text');
buttonContainer.setAttribute('class','button-container')

displayText.textContent = 'numbers here';

document.addEventListener("DOMContentLoaded", () => {
    createButtonGrid();
    setButtonValues();
  });


function setButtonValues(){
    const operators = ['AC','+/-','%','/','*','-','+','='];
    const buttonID = ['input-0-0', 'input-1-0', 'input-2-0','input-3-0',
        'input-3-1','input-3-2','input-3-3','input-3-4'];

    const numberValues = ['0','0','.','1','2','3','4','5','6','7','8','9'];
    const numberButtonID = ['input-0-4','input-1-4','input-2-4','input-0-3',
        'input-1-3','input-2-3','input-0-2','input-1-2','input-2-2','input-0-1','input-1-1','input-2-1']

    for(let i = 0; i < 8; i++){
        const operatorButton = document.getElementById(buttonID[i]);
        operatorButton.classList.add('operator-button')
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
    console.log(totalHeight/5+'px');
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
            console.log(totalHeight/5);
            row.appendChild(input);

        }
        buttonContainer.appendChild(row);
    }
    container.appendChild(buttonContainer);
}



display.appendChild(displayText);
container.appendChild(display);

document.body.appendChild(container);





