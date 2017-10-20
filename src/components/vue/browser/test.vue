<template>
    <a-scene>
        <a-assets>
            <img :src="item.src" v-for="item in items" :key="item.id" :id="'item-' + item.id" crossorigin="anonymous" />
        </a-assets>
        <a-sky color="#6EBAA7"></a-sky>
        <browser id="browser" position="0 1.5 2"></browser>
        <a-entity camera="near: 0.01" look-controls position="0 1.5 -1">
            <a-entity cursor="fuse: true; fuseTimeout: 500" raycaster="far: 20" geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03" material="color: gold; shader: flat" position="0 0 -1">
                <a-animation begin="click" easing="ease-in" attribute="scale" dur="150" fill="forwards" from="0.1 0.1 0.1" to="1 1 1"></a-animation>
                <a-animation begin="cursor-fusing" easing="ease-in" attribute="scale" dur="1500" fill="backwards" from="1 1 1" to="0.1 0.1 0.1"></a-animation>
            </a-entity>
        </a-entity>
    </a-scene>
</template>

<script>
require('aframe');
import Bus from "../../../bus"
export default {
    name: 'app',
    data() {
        return {
            items: []
        }
    },
    components: { browser: require('./index.vue') },
    created: function() {
        let self = this
        Bus.$on('items-fetched', function (items) {
            console.log('items received')
            self.items = items;
        })
    }
}
</script>

