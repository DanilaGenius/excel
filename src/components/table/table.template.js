import { toInlineStyles } from '@core/utils';
import {parse} from '@core/parse'

const CODES = {
    A: 65,
    Z: 90,
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24
// function 

function createCell(state, row) {
        return function( _, coll) {
                const id = `${row}:${coll}`
                const styles = toInlineStyles(state.stylesState[id])
                return `<div class="cell" contenteditable data-col=${coll}  
                style="
                     ${styles} ;
                     width: ${getWidth(state.colState, coll)}
                "
                data-id=${id}
                data-value="${getHTMLCell(state.dataState, id)}"
                data-type="cell"
                >${parse(getHTMLCell(state.dataState, id))}</div>`
            }    
    }    


function createCol(col, index) {
    return `
        <div class="column" data-type="resizable" data-col=${index} style="width: ${col.width};">
        ${col.col}
        <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function  createRow(content, num = '', state){
    const resize = num ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row" data-type="resizable"
        style="height: ${getHeight(state, num)};"
        data-row="${num}">
            <div class="row-info">
            ${num}
            ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHTMLCell(state, index) {
    return state[index] || ''
}

function getHeight(state, index) {
    if (index >= 1 ) {
        return (state[index] || DEFAULT_HEIGHT) + 'px'
    }
    
}

function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsCount = 20, state = {}) {
    const colmsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colmsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(createCol)
    .join(' ')
    
    
    
    

    rows.push(createRow(cols))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colmsCount)
    .fill('')
    .map(createCell(state, i))
    .join('')

        rows.push(createRow(cells,i + 1, state.rowState))
    }

    return rows.join('')
}