const CODES = {
    A: 65,
    Z: 90,
}

// function 

function createCell(row) {
        return function( _, coll) {
                return `<div class="cell" contenteditable data-col=${coll} 
                data-id="${row}:${coll}"
                data-type="cell"></div>`
            }    
    }    


function createCol(col, index) {
    return `
        <div class="column" data-type="resizable" data-col=${index}>
        ${col}
        <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function  createRow(content, num = ''){
    const resize = num ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
            ${num}
            ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

export function createTable(rowsCount = 20) {
    const colmsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colmsCount)
    .fill('')
    .map((e,i,a) => a[i] = String.fromCharCode(CODES.A + i))
    .map(createCol)
    .join(' ')
    
    
    
    

    rows.push(createRow(cols))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colmsCount)
    .fill('')
    .map(createCell(i))
    .join('')

        rows.push(createRow(cells,i + 1))
    }

    return rows.join('')
}