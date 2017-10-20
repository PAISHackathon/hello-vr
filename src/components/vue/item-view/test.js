import Vue from "vue";
import test from "./test.vue";
import Bus from "../../../bus"

window.addEventListener("load", function(event) {
  new Vue({
    el: "#app",
    render: h => h(test),
    mounted: function() {
        // what to do when components are placed on the page
        let item = {
          title: "hi",
          description: "A-Frame is an open-source web framework for building virtual reality (VR) experiences.[1] It is primarily maintained by Mozilla and the WebVR community. It is an entity component system framework for Three.js where developers can create 3D and WebVR scenes using HTML. HTML provides a familiar authoring tool for web developers and designers while incorporating a popular game development pattern used by engines such as Unity.",
          src: "https://farm5.staticflickr.com/4187/33672581183_ca29e435cd_c.jpg",
          backdrop_src: "https://farm5.staticflickr.com/4265/35698488991_0f96fc86a9_c.jpg"
        }
        console.log(item)
        Bus.$emit('view-item', item)
    }
  });

});
