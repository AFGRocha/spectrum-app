import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
//import "buefy/dist/buefy.css";
import "./registerServiceWorker";
import FunctionalCalendar from 'vue-functional-calendar';


Vue.use(Buefy);
Vue.use(FunctionalCalendar, {
  dayNames: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
