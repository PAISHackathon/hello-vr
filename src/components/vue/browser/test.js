import Vue from "vue";
import test from "./test.vue";
import Bus from "../../../bus";
import Datasource from "../../../datasources";

window.addEventListener("load", function(event) {
  new Vue({
    el: "#app",
    render: h => h(test),
    mounted: function() {
      const mdb = Datasource.from("flickr");
      console.log("emitting items", Datasource.from("tmdb"));
      mdb.example().then(res => {
        console.log('result', res.results)

        Bus.$emit("items-fetched", res.results);
      });
    }
  });
});
