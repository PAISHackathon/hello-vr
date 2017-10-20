<template>
    <a-entity material="opacity: 1">
        <a-animation attribute="material.opacity" begin="browser-fadeOut" to="0"></a-animation>
        <a-animation attribute="material.opacity" begin="browser-fadeIn" to="1"></a-animation>
        <a-entity position="0 0.112 -5.393" rotation="-17.933578987594768 0 0" light="angle:20;type:spot;penumbra:1;castShadow:true"></a-entity>
        <a-entity :half-pipe="half_pipe" :rotation="rotation">
            <a-image cursor-listener look-at="[camera]" v-for="item in displayedItems" :id="item.id"  :key="item.id" :src="'#item-' + item.id" class="collidable" width="1" :height="1/scale">
            </a-image>
        </a-entity>
        <a-entity dpad="repeatClickEveryMs: 2000" look-at="[camera]" scale="0.4 0.4 0.4" :position="dpadPosition"></a-entity>
    </a-entity>
</template>

<script>
//require('aframe-layout-component');
require('../../aframe/half-pipe');
require('../../aframe/dpad');
require('aframe-look-at-component');
import Bus from '../../../bus.js'

function createPaginator() {
    let paginator = document.createElement('a-entity');
    paginator.setAttribute('geometry', { primitive: 'box' })

    return paginator;
}

export default {
    name: 'browser',
    props: {
        itemsPerPage: {
            type: Number,
            default: 6
        },
        radius: {
            type: Number,
            default: 8
        }
    },
    data() {
        return {
            comments: true, // preserve comments
            items: [
            ],
            scale: 500 / 750,
            arc: Math.PI / 2,
            currentPage: 1
        }
    },
    computed: {
        rotation() {
            let y = 180 - (Math.PI - this.arc) / 2 * 57.2958
            return `0 ${y} 0`
        },
        half_pipe() {
            return `arc: ${this.arc}; plane: xz; radius: ${this.radius}`
        },
        dpadPosition() {
            return `-.2 -1 -${this.radius}`
        },
        itemsLeftPart() {
            let start = (this.currentPage - 1) * this.itemsPerPage;
            let end = start + Math.floor(this.itemsPerPage / 2)
            console.log('left start', start, 'end', end)
            return this.items.slice(start, end)
        },
        itemsRightPart() {
            let start = (this.currentPage - 1) * this.itemsPerPage + Math.floor(this.itemsPerPage / 2);
            let end = this.currentPage * this.itemsPerPage;
            console.log('right start', start, 'end', end)
            return this.items.slice(start, end)
        },
        displayedItems() {
            let start = (this.currentPage - 1) * this.itemsPerPage;
            let end = this.currentPage * this.itemsPerPage;
            return this.items.slice(start, end)
        }
    },
    created() {
        // create control element
        let self = this;

        Bus.$on('items-fetched', (items) => {
            console.log(items)
            this.items = items;
        })
    },
    mounted: function() {
        let self = this
        let dpadElm = this.$el.querySelector('[dpad]')
        console.log('dpadElm', dpadElm)

        function updateDpad() {
            dpadElm.setAttribute('dpad', 'leftButtonEnabled', self.currentPage > 1)
            dpadElm.setAttribute('dpad', 'rightButtonEnabled', self.currentPage < Math.floor(self.items.length / self.itemsPerPage))
        }

        // dpad listener
        dpadElm.addEventListener('dpad-left-click', function() {
            console.log('dpad-left-click. currentPage', self.currentPage)

            if (self.currentPage > 1) {
                self.$el.emit('fadeOut')
                self.currentPage--;
                setTimeout(function() { self.$el.emit('fadeIn') }, 500)
            }
            updateDpad()
        })

        dpadElm.addEventListener('dpad-right-click', function() {
            console.log('dpad-right-click. currentPage', self.currentPage)

            if (self.currentPage < Math.floor(self.items.length / self.itemsPerPage)) {
                self.$el.emit('fadeOut')
                self.currentPage++;
                setTimeout(function() { self.$el.emit('fadeIn') }, 500)
            }

            updateDpad()
        })
    }
}
</script>