import Vue from "vue";
import test from "./test.vue";

window.addEventListener("load", function(event) {
  new Vue({
    el: "#app",
    render: h => h(test)
  });
});
