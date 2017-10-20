<template>
    <a-entity>
         <a-image src="#poster" material="" look-at="[camera]" width="4" height="4" position="-0.12 3.155 0"></a-image>
         <!--a-entity position="0 -0.032 0" geometry="height:2;primitive:plane;width:5" material="color:blue; opacity: 0.8" :text="'width: auto; align: center; value: ' + description"></a-entity-->
    </a-entity>
</template>

<script>
import Bus from "../../../bus.js";

export default {
  name: "item-view",
  props: {
   
  },
  data() {
    return {
        title: "",
        description: "",
        backdropSrc: "",
        posterSrc: "",

    };
  },
  computed: {},
  created() {},
  mounted: function() {
    let self = this;
    Bus.$on("view-item", function(item) {
      console.log("item-view", item);
      self.backdropSrc = item.backdrop_src;
      self.posterSrc = item.src;
      self.title = item.title;
      self.description = item.description;
    });
  }
};
</script>