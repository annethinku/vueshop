import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import index from '@/components/index/index'
import product from '@/components/inRoute/product/product'
import psort from '@/components/inRoute/psort/psort'
import addProduct from '@/components/inRoute/addProduct/addProduct'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      redirect: '/product',
      component: index,
      children: [{
        path: '/product',
        name: 'product',
        component: product
      },{
        path: '/psort',
        name: 'psort',
        component: psort
      },{
        path: '/addProduct',
        name: 'addProduct',
        component: addProduct
      }]
    }
  ]
})
