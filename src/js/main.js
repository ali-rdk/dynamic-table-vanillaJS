import '../scss/styles.scss';
import * as bootstrap from 'bootstrap';


const table = document.querySelector('#info-table');


let data = [];

const tableData = localStorage.getItem('names');
if(!tableData){
    const newRow = document.createElement('tr');
    for(let i =0; i<3;i++){
        const newCell = document.createElement('td');
        if(i < 2){
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.classList = 'h-100 w-100 bg-transparent';
            newCell.appendChild(newInput); 
            newRow.appendChild(newCell);
        }else{
            newCell.id = "full-name";
            newRow.appendChild(newCell);
        }
        table.children[1].appendChild(newRow);
    }
} else {
    const parsedTableData = JSON.parse(tableData);
    parsedTableData.forEach(element => {
        const newRow = document.createElement('tr');
        for(let i =0; i<3;i++){
            const newCell = document.createElement('td');
            if(i < 2){
                const newInput = document.createElement('input');
                newInput.type = 'text';
                newInput.classList = 'h-100 w-100 bg-transparent';
                newInput.value = element.split(" ")[i]
                newCell.appendChild(newInput); 
                newRow.appendChild(newCell);
            }else{
                newCell.id = "full-name";
                newCell.innerHTML = element;
                newRow.appendChild(newCell);
            }
            table.children[1].appendChild(newRow);
        }
    });

    const newRow = document.createElement('tr');
    for(let i =0; i<3;i++){
        const newCell = document.createElement('td');
        if(i < 2){
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.classList = 'h-100 w-100 bg-transparent';
            newCell.appendChild(newInput); 
            newRow.appendChild(newCell);
        }else{
            newCell.id = "full-name";
            newRow.appendChild(newCell);
        }
        table.children[1].appendChild(newRow);
    }
}

let currentRow = table.children[1].children[0];
let rowCount = 1;

// const inputCells = document.querySelectorAll('input');
// inputCells[0].focus()

table.addEventListener('keydown',e => {
    if(e.key === 'Enter'){
        const currentCell = e.target.parentNode;
        let rowCells = currentCell.parentNode.children;
        let nextCellIndex = Array.prototype.indexOf.call(rowCells, currentCell) + 1;
        
        if (nextCellIndex + 1 >= rowCells.length){
            const rowData = rowCells[0].children[0].value + ' ' + e.target.value;
            rowCells[2].innerHTML = rowData;

            const names = localStorage.getItem('names');
            if(!names){
                data.push(rowData);
                localStorage.setItem('names', JSON.stringify(data));
            } else{
                const parsedNames = JSON.parse(names);
                data.push(rowData);
                const addedNames = [...parsedNames, rowData];
                localStorage.setItem('names',JSON.stringify(addedNames))
            }
        }

        if(nextCellIndex + 1 >= rowCells.length){
            nextCellIndex = 0;

            if(currentRow === table.children[1].lastElementChild){
                rowCount++;
                const newRow = document.createElement('tr');
                for(let i =0; i<3;i++){
                    const newCell = document.createElement('td');
                    if(i < 2){
                        const newInput = document.createElement('input');
                        newInput.type = 'text';
                        newInput.classList = 'h-100 w-100 bg-transparent';
                        newCell.appendChild(newInput); 
                        newRow.appendChild(newCell);
                    }else{
                        newCell.id = "full-name";
                        newRow.appendChild(newCell);
                    }
                }
                table.children[1].appendChild(newRow);
                currentRow = currentRow.nextElementSibling;
            } else{
                currentRow = currentRow.nextElementSibling;
            }
        }   
        currentRow.children[nextCellIndex].children[0].focus();
    }
})