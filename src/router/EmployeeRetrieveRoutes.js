import {EmployeeInfoRetrieveView} from '~/views/'
import {EmployeeSkillVitaeRetrieveView} from '~/views/'

const EmployeeRetrieveRoutes = [
    { path: '/', redirect: '/EmployeeInfoRetrieveView'},
    { path: '/EmployeeInfoRetrieveView', name:'EmployeeInfoRetrieveView', component: EmployeeInfoRetrieveView },
    { path: '/EmployeeSkillVitaeRetrieveView', name:'EmployeeSkillVitaeRetrieveView', component: EmployeeSkillVitaeRetrieveView },
]
export default EmployeeRetrieveRoutes