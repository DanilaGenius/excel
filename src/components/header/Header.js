import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions'
import {$} from '@core/dom'
import {defaulsStyles} from '@/constants';
import {debouce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
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

            <div class="button data-button="remove">
                <i class="material-icons" data-button="remove">
                    delete
                    </i>
            </div>

            <div class="button" data-button="exit">
                <i class="material-icons" data-button="exit">
                    exit_to_app
                    </i>
            </div>

        </div>
        `
    }

    onClick(event) {
        const $target = $(event.target)

        if ($target.data.button === 'remove') {
            const decision = confirm('You are sure?')
            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param[1])
                ActiveRoute.navigate('')
            }
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        }
    }

    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(actions.changeTitle($target.text()))
    }

   
}