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
  });

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





