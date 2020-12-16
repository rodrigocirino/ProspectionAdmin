import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home';
import Login from '@/views/Login';
import Prospectos from "@/views/Prospectos";
import Cliente from "@/views/Cliente";
import Vendedor from "@/views/Vendedor";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Vendedor
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/prospectos',
        name: 'Prospectos',
        component: Prospectos
    },
    {
        path: '/cliente',
        name: 'Cliente',
        component: Cliente
    },
    {
        path: '/vendedor',
        name: 'Vendedor',
        component: Vendedor
    }
]

const router = new VueRouter({
    routes
})

export default router
