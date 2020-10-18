import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import Home from './views/Home'
import Login from './views/Login'


Vue.config.productionTip = false


Vue.use(VueRouter)

const routes = [ // define as rotas e os componentes
  { path: '/', component: Home, },
  { path: '/login', component: Login}
];

const router = new VueRouter({ // instancia o router
  routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
