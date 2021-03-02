import {CommonCodeRetrieveView} from '~/views/'

const CommonCodeRoutes = [
    { path: '/', redirect: '/CommonCodeRetrieveView'},
    { path: '/CommonCodeRetrieveView', name:'CommonCodeRetrieveView', component: CommonCodeRetrieveView },
]
export default CommonCodeRoutes