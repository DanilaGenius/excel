

export class TableSelection {
    constructor() {
        this.group = []
        this.current = null
    }

    static className = 'selected'

    select($el) {
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.focus().addClass(TableSelection.className)
    }

    clear() {
        this.group.forEach($cell => $cell.removeClass(TableSelection.className))
        this.group = []
    }

    get selectedIds() {
        return this.group.map(el => el.id())
    }

    selectGroup($group = []) {
        this.clear()

        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }

    applyStyle(style) {
        this.group.forEach(el => {
            el.css(style[0])})
    }
}