import {DomListener} from '@core/DomListener';


export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.store = options.store
        this.subscribe = options.subscribe || []
        this.unsubscribers = []
        this.storeSub = null
        this.prepare()
       
    }

    // настраиваем окружение до init
    prepare() {}

    // return pattern of component
    toHTML() {
        return ''
    }

    // уведомляем слушателей о событии eventName
    $emit(eventName, ...args) {
        this.emitter.emit(eventName, ...args)
    }

    // подписываемся на событие eventName
    $on(eventName, fn) {
       const unsub = this.emitter.subscribe(eventName, fn)
       this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    storeChange() {

    }

    // $subscribe(fn) {
    //     this.storeSub = this.store.subscribe(fn)
    // }

    // инициализируем компонент
    // добавляем DOM слушателей
    init() {
        this.initDomListeners()
    }

    // удаляем компонент
    // чистим слушателей
    destroy() {
        this.removeDomListeners()
        this.unsubscribers.forEach(unsub => unsub())
        // this.storeSub.unsubscribe()
    }
}