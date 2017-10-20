import Vue from "vue";
import App from "./App.vue";

window.addEventListener("load", function(event) {
  new Vue({
    el: "#app",
    render: h => h(App)
  });
});