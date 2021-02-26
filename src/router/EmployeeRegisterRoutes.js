import {EmployeeInfoReigsterView} from '~/views/'
import {EmployeeSkillVitaeRegisterView} from '~/views/'

const EmployeeRegisterRoutes = [
    // { path: '/', redirect: '/product/list', component: EmployeeInfoReigsterView },
    { path: '/EmployeeInfoReigsterView', name:'EmployeeInfoReigsterView', component: EmployeeInfoReigsterView },
    { path: '/EmployeeSkillVitaeRegisterView', name:'EmployeeSkillVitaeRegisterView', component: EmployeeSkillVitaeRegisterView },
]
export default EmployeeRegisterRoutes