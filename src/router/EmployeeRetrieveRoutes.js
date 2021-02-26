import {EmployeeInfoRetrieveView} from '~/views/'
import {EmployeeSkillVitaeRetrieveView} from '~/views/'

const EmployeeRetrieveRoutes = [
    // { path: '/', redirect: '/product/list', component: EmployeeInfoReigsterView },
    { path: '/EmployeeInfoRetrieveView', name:'EmployeeInfoRetrieveView', component: EmployeeInfoRetrieveView },
    { path: '/EmployeeSkillVitaeRetrieveView', name:'EmployeeSkillVitaeRetrieveView', component: EmployeeSkillVitaeRetrieveView },
]
export default EmployeeRetrieveRoutes