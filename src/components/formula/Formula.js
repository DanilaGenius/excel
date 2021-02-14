import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'
// import {parse} from '@core/parse'

export class Formula extends ExcelComponent {
    static className = 'excel__formule'
    
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText', 'rowState'],
            ...options
        })
    }

    toHTML() {
        return `
        <div class="info">fx</div>
        <div id="formula" class="input" contenteditable spellcheck="false"></div>`
    }

    init() {
        super.init()

        this.$formula = this.$root.find('#formula')

        this.$on('table:select', (cell) => {
            const $cell = cell['0']
            const text = $cell.text() || ' '
            this.$formula.text($cell.data.value)
        })

        // this.$on('formula:input', (text) => {
            
        //         this.$formula.text(text)
        //     })
    }

    storeChanged(changes) {
        this.$formula.text(changes.currentText)
    }

    onInput(event) {
        
        this.$emit('formula:input',  $(event.target).text())
    }

    onKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            this.$emit('formula:done') 
        } 
    }    
}