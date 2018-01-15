import Vue from 'vue'
import HotKey from '@/plugins/hot-key'
import Element from '@/plugins/element-ui'
import App from './App'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* use element-ui */
Vue.use(Element)

/* use hot key plguins */
Vue.use(HotKey)

/* use element-ui */
Vue.use(Element)

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
