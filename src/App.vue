<template>
  <a-scene leap="vr: false" physics="debug: false"  antialias="true">
    <a-assets>
      <!-- '/proxy?url=' +  -->
      <img :src="item.src" v-for="item in items" :key="item.id" :id="'item-' + item.id" crossorigin="anonymous" />
      <img :src="backdropSrc" id="backdrop" crossorigin="anonymous" />
      <img :src="posterSrc" id="poster" crossorigin="anonymous" />
    </a-assets>

    <!--a-grid/-->
    <a-entity environment="preset: starry; ground:canyon; dressing:pyramids; groundTexture: walkernoise; skyType:atmosphere;"></a-entity>
    <item-view position="0 3.477 0"></item-view>

    <!--pointer which-hand="left"></pointer>
    <pointer which-hand="right"></pointer-->

    <!-- Immovable box -->
    <!--a-box cursor-listener static-body position="0 1.5 -4" width="1" height="1" depth="1"></a-box-->

    <!-- the meat -->
    <browser id="browser" position="0 1.5 4"></browser>

    <!-- menu -->
    <!--a-entity id="menu" speech-command__show="command: show menu; type: attribute; attribute: visible; value: true;" speech-command__hide="command: hide menu; type: attribute; attribute: visible; value: false;">

                    </a-entity-->
    <hal language="en-US"></hal>

    <!-- only on vr true -->
    <a-entity camera="near: 0.01" look-controls position="0 1.5 2">
      <a-entity cursor="fuse: true; fuseTimeout: 500" raycaster="far: 20" geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03" material="color: gold; shader: flat" position="0 0 -1">
        <a-animation begin="click" easing="ease-in" attribute="scale" dur="150" fill="forwards" from="0.1 0.1 0.1" to="1 1 1"></a-animation>
        <a-animation begin="cursor-fusing" easing="ease-in" attribute="scale" dur="1500" fill="backwards" from="1 1 1" to="0.1 0.1 0.1"></a-animation>
      </a-entity>
    </a-entity>

  </a-scene>
</template>

<script>
require("aframe");
require("aframe-environment-component");
//require('aframe-speech-command-component');
//require('aframe-physics-system');
//require("aframe-leap-hands").registerAll();
import Bus from "./bus.js";
import DataSource from "./datasources";

//const extras = require('aframe-extras');
//extras.registerAll();

export default {
  name: "app",
  components: {
    browser: require("./components/vue/browser/index.vue"),
    pointer: require("./components/vue/pointer/pointer.vue"),
    hal: require("./components/vue/hal/hal.vue"),
    'item-view': require("./components/vue/item-view/index.vue")
  },

  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      items: [],
      datasource: "flickr",
      posterSrc:
        "https://farm5.staticflickr.com/4187/33672581183_ca29e435cd_s.jpg", // dummy
      backdropSrc:
        "https://farm5.staticflickr.com/4187/33672581183_ca29e435cd_s.jpg" // dummy
    };
  },

  computed: {
    activeDatasource() {
      return DataSource.from(this.datasource);
    }
  },

  created() {
    console.log("setting up slots");
    Bus.$on("fetchItems", keyword => {
      this.fetchItems(keyword);
    });
    Bus.$on("items-fetched", items => {
      this.updateAssets(items);
    });
  },

  mounted() {
    let self = this;
    console.log("mounted");
    this.fetchItems();
    //speak("interface ready. ask me to search something");

    let playerEl = document.querySelector("[camera]");
    //console.log(playerEl)
    playerEl.addEventListener("collide", function(e) {
      console.log("Player has collided with body #" + e.detail.body.id);

      e.detail.target.el; // Original entity (playerEl).
      e.detail.body.el; // Other entity, which playerEl touched.
      e.detail.contact; // Stats about the collision (CANNON.ContactEquation).
      e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
    });

    // Component to change to a sequential color on click.
    AFRAME.registerComponent("cursor-listener", {
      init: function() {
        this.el.addEventListener("click", function(evt) {
          //lastIndex = (lastIndex + 1) % COLORS.length;
          //this.setAttribute('material', 'opacity', COLORS[lastIndex]);
          //console.log('I was clicked at: ', evt.detail.intersection.point);
          console.log(evt.target.id);
          Bus.$emit("intent-view-item", { id: evt.target.id });
        });
      }
    });

    // intent to view
    Bus.$on("intent-view-item", function(data) {
      let chosen_item = self.items.filter(function(item) {
        return item.id == data.id;
      });
      console.log('chosen_item', chosen_item)

      if (chosen_item.length) {
        console.log('chosen_item', chosen_item[0].src)
        Bus.$emit("view-item", chosen_item[0]);
      } else {
        console.log("cannot found item with id", data.id);
      }
    });

    // load item
    Bus.$on("view-item", function(item) {
      console.log('app on view-item', item.src)
      self.backdropSrc = item.backdrop_src;
      self.posterSrc = item.src + "";
    });
  },

  methods: {
    updateAssets(items) {
      this.items = items;
    },
    fetchItems(keyword) {
      const ds = this.activeDatasource;
      console.log("ds", ds);
      //ds.search('doggo').then(res=> {console.log(res); Bus.$emit('items-fetched', res.results)})
      let p;
      if (keyword != undefined) {
        p = ds.search(keyword);
      } else p = ds.example();
      p.then(res => {
        console.log("App res", res);
        Bus.$emit('items-fetched', res.results)
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
