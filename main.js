import App from './App'

import Vue from 'vue'
import mixin from '@/mixin'
Vue.config.productionTip = false
Vue.mixin(mixin)

App.mpType = 'app'
const app = new Vue({
	...App
})

app.$mount()