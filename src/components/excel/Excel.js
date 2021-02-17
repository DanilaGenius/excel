import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'
import {createStore} from '@core/createStore'
import { StoreSubscriber } from '@core/StoreSuscriber'
import { updateDate } from '@/redux/actions'
// import {rootReducer} from '@/redux/rootReducer'


export class Excel {
    constructor(options) {
        this.components = options.components || []
        this.emitter = new Emitter()
        this.store = options.store
        this.subscriber = new StoreSubscriber(this.store)

    }

    getRoot() {
        const  $root = $.create('div', 'excel')
        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }
        
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            
            if (component.name) {
                window['f' + component.name] = component
            }

            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        return $root
    }

    init() {
        this.store.dispatch(updateDate())
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init())
    }

    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(component => component.destroy())
    }

   
}

