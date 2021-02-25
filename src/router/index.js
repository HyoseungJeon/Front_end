import VueRouter from 'vue-router'

const routes = [

    // { path: '/', redirect: '/product', name : 'index' , props: true},
    // { path: '/product', component: ProductContent,
    //     children: ProductRoutes , props: true
    // },
    // { path: '/member', component: MemberContent,
    //     children: MemberRoutes
    // },
    // { path: '/customer-service',name : 'customer-service', component: CustomerServicePage},
]

export default new VueRouter({
    //mode: 'history',
    routes:routes // `routes: routes`의 줄임
})