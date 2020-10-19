import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import Home from './views/Home'
import Login from './views/Login'
import Job from './views/Job'
import CreateJob from './views/CreateJob'
import UpdateJob from './views/UpdateJob'

Vue.config.productionTip = false


Vue.use(VueRouter)

const routes = [ // define as rotas e os componentes
  { path: '/', component: Home, },
  { path: '/login', component: Login },
  { path: '/job/:id', component: Job, props: true },
  { path: '/job/update/:id', component: UpdateJob, props: true },
  { path: '/job/', component: CreateJob }
];

const router = new VueRouter({ // instancia o router
  routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
