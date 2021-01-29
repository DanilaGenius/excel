import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.lesteners)
        this.name = options.name || ''
    }

    // return pattern of component
    toHTML() {
        return ''
    }

    init() {
        this.initDomListeners()
    }

    destroy() {
        this.removeDomListeners()
    }
}