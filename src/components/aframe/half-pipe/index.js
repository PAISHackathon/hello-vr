/**
 * Layout component for A-Frame.
 * Some layouts adapted from http://www.vb-helper.com/tutorial_platonic_solids.html
 */
import AFRAME from "aframe";

AFRAME.registerComponent("half-pipe", {
  schema: {
    arc: { type: "number", default: Math.PI },
    angle: {
      type: "number",
      default: false,
      min: 0,
      max: Math.PI
    },
    plane: { default: "xy" },
    radius: { default: 1, min: 0 },
    reverse: { default: false }
  },

  /**
     * Store initial positions in case need to reset on component removal.
     */
  init: function() {
    let self = this;
    let el = this.el;

    this.children = el.getChildEntities();
    this.initialPositions = [];

    this.children.forEach(function getInitialPositions(childEl) {
      if (childEl.hasLoaded) {
        return _getPositions();
      }
      childEl.addEventListener("loaded", _getPositions);
      function _getPositions() {
        let position = childEl.getAttribute("position");
        self.initialPositions.push([position.x, position.y, position.z]);
      }
    });

    el.addEventListener("child-attached", function(evt) {
      // Only update if direct child attached.
      if (evt.detail.el.parentNode !== el) {
        return;
      }
      self.children.push(evt.detail.el);
      self.update();
    });

    el.addEventListener("child-detached", function(evt) {
      // Only update if direct child detached.
      if (self.children.indexOf(evt.detail.el) === -1) {
        return;
      }
      self.children.splice(self.children.indexOf(evt.detail.el), 1);
      self.initialPositions.splice(self.children.indexOf(evt.detail.el), 1);
      self.update();
    });
  },

  /**
     * Update child entity positions.
     */
  update: function() {
    let children = this.children;
    let data = this.data;
    let numChildren = children.length;
    let positionFn;
    let positions;

    // Calculate different positions based on layout shape.

    positionFn = getCirclePositions;

    positions = positionFn(
      data,
      numChildren,
      false
    );
    if (data.reverse) {
      positions.reverse();
    }
    setPositions(children, positions);
  },

  /**
   * Reset positions.
   */
  remove: function () {
    this.el.removeEventListener('child-attached', this.childAttachedCallback);
    setPositions(this.children, this.initialPositions);
  }
});

/**
   * Get positions for `circle` layout.
   */
function getCirclePositions(data, numChildren) {
  let positions = [];

  for (let i = 1; i <= numChildren; i++) {
    let rad;

    if (isNaN(data.angle)) {
      rad = i * data.arc / (numChildren + 1);
    } else {
      rad = i * data.angle * 0.01745329252; // Angle to radian.
    }

    let position = [];
    if (data.plane.indexOf("x") === 0) {
      position[0] = data.radius * Math.cos(rad);
    }
    if (data.plane.indexOf("y") === 0) {
      position[1] = data.radius * Math.cos(rad);
    }
    if (data.plane.indexOf("y") === 1) {
      position[1] = data.radius * Math.sin(rad);
    }
    if (data.plane.indexOf("z") === 1) {
      position[2] = data.radius * Math.sin(rad);
    }
    positions.push(position);
  }
  return positions;
}

/**
   * Set position on child entities.
   *
   * @param {array} els - Child entities to set.
   * @param {array} positions - Array of coordinates.
   */
function setPositions(els, positions) {
  els.forEach(function(el, i) {
    let position = positions[i];
    el.setAttribute("position", {
      x: position[0],
      y: position[1],
      z: position[2]
    });
  });
}
