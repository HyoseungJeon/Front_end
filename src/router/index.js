import VueRouter from 'vue-router'

import ContentRoutes from './ContentRoutes.js'

const routes = ContentRoutes

export default new VueRouter({
    //mode: 'history',
    routes : routes
})