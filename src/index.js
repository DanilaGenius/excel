// import {Excel} from '@/components/excel/Excel';
// import {Header} from '@/components/header/Header';
// import {Toolbar} from '@/components/toolbar/Toolbar';
// import {Formula} from '@/components/formula/Formula';
// import {Table} from '@/components/table/Table';
// import {createStore} from '@core/createStore'
// import {rootReducer} from '@/redux/rootReducer'
// import {initialState} from '@/redux/initialState'
// import {storage, debouce} from '@core/utils'
import './scss/index.scss';
import { Router } from '@core/routes/Router'
import {ExcelPage} from '@/pages/ExcelPage'
import {DashboardPage} from '@/pages/DashboardPage'

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})

