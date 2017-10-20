<template>
    <a-entity collider-check :aframe-leap-pointer="'hmdMode: false; isLeftHand:' + is_left_hand" geometry="primitive: box; depth: 0.1; height: 0.1; width: 0.1">
    </a-entity>
</template>

<script>
import Bus from '../../../bus.js';
import Leap from 'leapjs';

require('aframe')
require('../../aframe/aframe-leap-pointer')

// default collider
AFRAME.registerComponent('collider-check', {
    dependencies: ['raycaster'],
    init: function() {
    }
});

export default {
    props: {
        'whichHand': {
            type: String,
            default: 'right',
            validator(value) {
                return ['left', 'right'].indexOf(value) >= 0
            }
        }
    },
    data() {
        return {
            
        }
    },
    computed: {
        is_left_hand() {
            return this.whichHand.toLowerCase() == 'left'
        },
        pointer_class() {
            return this.is_left_hand ? 'left' : 'right'
        }
    },
    mounted() {
        //this.raycasters = AFRAME.scenes[0].querySelectorAll(`.pointer.${this.pointer_class} [raycaster]`)
        
    },
    created() {
        
    }
}


</script>
