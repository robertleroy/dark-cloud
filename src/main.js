import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "./filters/filters"; 
import WeatherIcon from "./components/weatherIcon/WeatherIcon";
import Accordion from "./components/Accordion";
import SearchDlg from "./components/SearchDlg";
import draggable from "vuedraggable";
Vue.component("SearchDlg", SearchDlg);
Vue.component("Accordion", Accordion);
Vue.component("WeatherIcon", WeatherIcon);
Vue.component("draggable", draggable);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
