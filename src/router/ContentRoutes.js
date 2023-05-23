import {EmployeeRegister} from '~/components/'
import {EmployeeRetrieve} from '~/components/'
import {CommonCode} from '~/components/'

import EmployeeRegisterRoutes from './EmployeeRegisterRoutes.js'
import EmployeeRetrieveRoutes from './EmployeeRetrieveRoutes.js'
import CommonCodeRoutes from './CommonCodeRoutes.js'

const ContentRoutes = [
    { path: '/', name : 'home', },
    { path: '/EmployeeRegister', component: EmployeeRegister,
        children: EmployeeRegisterRoutes
    },
    { path: '/EmployeeRetrieve', name : 'EmployeeRetrieve', component: EmployeeRetrieve,
        children: EmployeeRetrieveRoutes 
    },
    { path: '/CommonCode', component: CommonCode ,
        children: CommonCodeRoutes 
    },
];

export default ContentRoutes