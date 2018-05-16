import '@/assets/styles/index.sass'
import Vue from 'vue'
import VueRx from 'vue-rx'
import Rx from 'rxjs/Rx'
import Element from '@/plugins/element-ui'
import Snippet from '@/plugins/upload'
import hotKeyService from '@/services/hotkeys'
import '@/services/leancloud'
import '@/services/runtime-error'
import { setting$$ } from '@/store/root'

/* eslint-disable */
const App = require('./App').default
/* eslint-enable */

require('./store')

Vue.config.productionTip = false

/* use element-ui */
Vue.use(Element)

/* use element-ui */
Vue.use(Element)

Vue.use(Snippet)

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
