import {storage} from '@core/utils'
import {defaulsStyles} from '@/constants';

const defaultState = {
    title: 'New table',
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaulsStyles,
}

export const initialState = storage('excel-state') ?
storage('excel-state') : defaultState