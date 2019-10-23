import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import WfdVue from '../src/index'

Vue.use(ElementUI);
Vue.use(WfdVue);

Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
}).$mount('#app');
