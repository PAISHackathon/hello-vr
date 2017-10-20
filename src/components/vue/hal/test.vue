<template>
    <a-scene>
        <hal language="en-US"></hal>
        <a-entity camera="near: 0.01" look-controls position="0 1.5 0">
        </a-entity>
    </a-scene>
</template>

<script>
require('aframe');

export default {
    name: 'app',
    components: { hal: require('./hal.vue') }
}
</script>

