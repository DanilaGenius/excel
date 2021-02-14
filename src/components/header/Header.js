import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions'
import {$} from '@core/dom'
import {defaulsStyles} from '@/constants';
import {debouce} from '@core/utils'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        })
    }

    prepare() {
        this.onInput = debouce(this.onInput, 500)
    }

    toHTML() {
        const title = this.store.getState().title
        return `
        <input type='text' class="input" value=${title} />

        <div class="">

            <div class="button">
                <i class="material-icons">
                    delete
                    </i>
            </div>

            <div class="button">
                <i class="material-icons">
                    exit_to_app
                    </i>
            </div>

        </div>
        `
    }

    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(actions.changeTitle($target.text()))
    }

   
}