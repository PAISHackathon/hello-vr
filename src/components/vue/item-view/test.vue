<template>
    <a-scene>
        <a-assets>
            <img :src="backdropSrc" id="backdrop" crossorigin="anonymous" />
            <img :src="posterSrc" id="poster" crossorigin="anonymous" />
        </a-assets>
        <a-sky color="#6EBAA7"></a-sky>
        <item-view position="0 1.289 0"></item-view>
        <a-entity camera="near: 0.01" look-controls position="0 1.5 4">
            <a-entity cursor="fuse: true; fuseTimeout: 500" raycaster="far: 20" geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03" material="color: gold; shader: flat" position="0 0 -1">
                <a-animation begin="click" easing="ease-in" attribute="scale" dur="150" fill="forwards" from="0.1 0.1 0.1" to="1 1 1"></a-animation>
                <a-animation begin="cursor-fusing" easing="ease-in" attribute="scale" dur="1500" fill="backwards" from="1 1 1" to="0.1 0.1 0.1"></a-animation>
            </a-entity>
        </a-entity>
    </a-scene>
</template>

<script>
require("aframe");
import Bus from "../../../bus";
export default {
  name: "app",
  data() {
    return {
      backdropSrc: "https://farm5.staticflickr.com/4187/33672581183_ca29e435cd_c.jpg",
      posterSrc: "https://farm5.staticflickr.com/4187/33672581183_ca29e435cd_c.jpg",
      title: "placeholder",
      description: "description"
    };
  },
  components: { "item-view": require("./index.vue") },
  mounted: function() {
    
  }
};
</script>

