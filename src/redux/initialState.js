// import {storage} from '@core/utils'
import {defaulsStyles} from '@/constants';
import {clone} from '@core/utils'


const defaultState = {
    title: 'New table',
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaulsStyles,
    openedDate: new Date().toJSON(),
}

const normalize = state => ({
    ...state,
    currentStyles: defaultState,
    currentText: ''
})

// export const initialState = storage('excel-state') ?
// storage('excel-state') : defaultState

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}