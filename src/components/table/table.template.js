const CODES = {
    A: 65,
    Z: 90,
}

function createCell() {
    return `
        <div class="cell" contenteditable></div>
    `
}

function createCol(col) {
    return `
        <div class="column">${col}</div>
    `
}

function  createRow(content, num = '') {
    return `
        <div class="row">
            <div class="row-info">${num}</div>
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
    .map((e) => createCol(e))
    .join(' ')
    
    const cells = new Array(colmsCount)
    .fill('')
    .map(() => createCell())
    .join('')
    
    

    rows.push(createRow(cols))

    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(cells,i + 1))
    }

    return rows.join('')
}