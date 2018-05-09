import '@/assets/styles/index.sass'
import Vue from 'vue'
import VueRx from 'vue-rx'
import Rx from 'rxjs/Rx'
import HotKey from '@/plugins/hot-key'
import Element from '@/plugins/element-ui'
import hotKeyService from '@/services/hotkeys'
import '@/services/leancloud'
import { setting$$ } from '@/store/root'

/* eslint-disable */
const App = require('./App').default
/* eslint-enable */

require('./store')

Vue.config.productionTip = false

/* use element-ui */
Vue.use(Element)

/* use hot key plguins */
Vue.use(HotKey)

/* use element-ui */
Vue.use(Element)

Vue.use(VueRx, Rx)

setting$$.subscribe((val) => {
  if (val) {
    hotKeyService(val.hotkey)
  }
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
/* eslint-enble */
