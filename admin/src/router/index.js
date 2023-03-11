import Vue from 'vue';
import VueRouter from 'vue-router'; 
import authMixin from "../mixins/authMixin";
import multipleContentConfig from "@/configs/multipleContent";
import { publicPath } from '../../vue.config'

 
function load(component) {
  return () => import(`@/views/${component}.vue`)
}

Vue.use(VueRouter)

const routes = [
  {
    title: 'Login Page',
    path: '/login',
    name: 'Login',
    component : load('Login'),
    beforeEnter: checkAdminRights,
  },
  {
    title: 'Signup Page',
    path: '/signup',
    name: 'Signup',
    component : load('Signup'),
    beforeEnter: checkAdminRights,
  },
  {
    path: '',
    component: load('LoggedInLayout'),
    beforeEnter: checkAdminRights,
    children: [
      {
        title: 'Home',
        path: '',
        name: 'Home',
        component: load('Home')
      },
      {
        title: 'MainInfo',
        path: 'main-info',
        name: 'MainInfo',
        component: load('MainInfo')
      },
      {
        title: 'Banners',
        path: 'banners',
        name: 'Banners',
        component: load('Banners')
      },
      {
        title: 'HomePage',
        path: 'home_page',
        name: 'HomePage',
        component: load('HomePage')
      },
      {
        title: 'History',
        path: 'history',
        name: 'History',
        component: load('History')
      },
      {
        title: 'Strategies',
        path: 'strategies',
        name: 'Strategies',
        key: 'strategies',
        props: multipleContentConfig.categories,
        component: load('MultipleContent')
      },
      {
        title: 'Advantages',
        path: 'advantages',
        name: 'Advantages',
        key: 'advantages',
        props: multipleContentConfig.advantages,
        component: load('MultipleContent')
      },
      {
        title: 'Quizz',
        path: '/quizz',
        name: 'Quizz',
        component: load('Quizz')
      },
    ]
  },
  {
    path: '*',
    name: 'Error',
    component: load('404')
  }
]
 

function checkAdminRights(to, from, next) {
  let access = authMixin.methods.verify();
  if(access){
    if(to.name === 'Login' || to.name === 'Signup'){
      next({ name: 'Home'});
    }else{
      next();
    }
  }else{
    if(to.name != 'Login' && to.name != 'Signup'){
      next({ name: 'Login'});
    }else{
      next();
    }
  }
}

const router = new VueRouter({
  mode:'history',
  base: publicPath,
  routes
})

export default router