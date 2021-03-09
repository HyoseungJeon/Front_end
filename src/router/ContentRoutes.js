import {EmployeeRegister} from '~/components/'
import {EmployeeRetrieve} from '~/components/'
import {CommonCode} from '~/components/'

import EmployeeRegisterRoutes from './EmployeeRegisterRoutes.js'
import EmployeeRetrieveRoutes from './EmployeeRetrieveRoutes.js'
import CommonCodeRoutes from './CommonCodeRoutes.js'

const ContentRoutes = [
    //{ path: '', redirect: '/member/signup', component: SignUpPage },
    { path: '/EmployeeRegister', component: EmployeeRegister,
        children: EmployeeRegisterRoutes
    },
    { path: '/EmployeeRetrieve', component: EmployeeRetrieve,
        children: EmployeeRetrieveRoutes 
    },
    { path: '/CommonCode', component: CommonCode ,
        children: CommonCodeRoutes 
    },
];

export default ContentRoutes