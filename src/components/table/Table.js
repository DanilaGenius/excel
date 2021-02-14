import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.function'
import {isCell} from '@/components/table/table.function'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'
import {matrix} from '@/components/table/table.function'
import {nextSelector} from '@/components/table/table.function'
import * as actions from '@/redux/actions'
import {defaulsStyles} from '@/constants';
import {parse} from '@core/parse'

export class Table extends ExcelComponent {
    static className = 'excel__table'
    
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'] ,
            ...options
        })
    }   

    toHTML() {
        return createTable(20, this.store.getState())
    }

    prepare() {
        this.selection = new TableSelection()
    }

   

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.$on('formula:input', (val) => {
                const value = val[0]
                console.log(value)
                this.selection.current.attr('data-value', value)
                this.selection.current.text(parse(value))
                this.updateTextInStore()
            })
        this.$on('formula:done', () => this.selection.current.focus() )
        this.selectCell($cell)

        this.$on('toolbar:applyStyle', (val) => {
            let value = val[0]
            this.selection.applyStyle(val)
            console.log(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        
        const styles = $cell.getStyles(Object.keys(defaulsStyles))
        this.$dispatch(actions.changeStyles(styles))
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn("Error", e.massage)
        }

    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const target = $target.id(true);
                const current = this.selection.current.id(true)
                const $cells = matrix(target, current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
            }
        }
    }

    onKeydown(event) {
        const keys = ['Tab', 'Enter', 'ArrowLeft', 
        'ArrowRight', 'ArrowDown', 'ArrowUp']

        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault() 
            
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selection.select($next)
            
            this.$emit('table:select', $next)
        }  
    }
    
    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event) {
        // this.$emit('formula:input', $(event.target).text())
       this.updateTextInStore($(event.target).text())
    }
};

