require("aframe-layout-component");
require("aframe-arrow-component");

function createArrow(id, color) {
  let arrow = document.createElement("a-entity");

  arrow.setAttribute("geometry", {
    primitive: "box"
  });

  arrow.setAttribute("material", {
    opacity: 1,
    color
  });

  arrow.setAttribute("id", id);

  return arrow;
}

function createAnimation(rotateTo) {
  let a = document.createElement("a-animation");
  a.setAttribute("attribute", "rotation");
  a.setAttribute("dur", 500);
  a.setAttribute("direction", "alternate");
  a.setAttribute("ease", "ease-in");
  a.setAttribute("from", "0 0 0");
  a.setAttribute("to", rotateTo ? rotateTo : "180 0 0");
  a.setAttribute("fill", "none");
  //a.setAttribute("repeat", "indefinite");
  a.setAttribute("begin", "start-animation");
  a.setAttribute("end", "mouseleave");

  return a;
}

function createContainer() {
  let container = document.createElement("a-entity");
  container.setAttribute("class", "dpad-container");

  return container;
}

import AFRAME from "aframe";

AFRAME.registerComponent("dpad", {
  schema: {
    repeatClickEveryMs: {
      type: "number",
      default: 1000,
      min: 1000,
      max: 50000
    },
    leftButtonEnabled: {
      type: "boolean",
      default: true
    },
    rightButtonEnabled: {
      type: "boolean",
      default: true
    }
  },
  init: function() {
    let el = this.el;
    let self = this;

    console.log(self.data);

    function onLoaded() {
      console.log("loaded");
      el.setAttribute("layout", "type: line; margin: 1.2");
      el.removeEventListener("loaded", onLoaded);
    }

    let leftBox = createArrow("dpad-left", "red");
    leftBox.setAttribute("rotation", "0 0 90");
    leftBox.setAttribute(
      "material",
      "opacity",
      self.data.leftButtonEnabled ? 1 : 0.1
    );
    this.leftBox = leftBox;

    leftBox.addEventListener("click", function() {
      self.isOnLeftSide = true;
      if (self.data.leftButtonEnabled) self.emitLeftClick.call(self);
    });

    this.isOnLeftSide = false;
    leftBox.addEventListener("mouseleave", function() {
      self.isOnLeftSide = false;
    });

    let rightBox = createArrow("dpad-right", "yellow");
    rightBox.setAttribute("rotation", "0 0 270");
    rightBox.setAttribute(
      "material",
      "opacity",
      self.data.rightButtonEnabled ? 1 : 0.1
    );
    this.rightBox = rightBox;

    rightBox.addEventListener("click", function() {
      self.isOnRightSide = true;
      self.emitRightClick.call(self);
    });

    this.isOnRightSide = false;
    rightBox.addEventListener("mouseleave", function() {
      self.isOnRightSide = false;
    });

    let cal = createAnimation("0 -180 0");
    let car = createAnimation("0 180 0");
    let cl = createContainer();
    let cr = createContainer();
    this.el.appendChild(cl);
    cl.appendChild(cal);
    cl.appendChild(leftBox);

    this.el.appendChild(cr);
    cr.appendChild(car);
    cr.appendChild(rightBox);

    this.trashable = [];
    this.trashable.push(cl);
    this.trashable.push(cr);

    el.addEventListener("loaded", onLoaded);
  },
  emitLeftClick: function() {
    console.log("left-click");
    if (this.isOnLeftSide && this.data.leftButtonEnabled) {
      this.el.emit("dpad-left-click", null, true);
      this.leftBox.emit("start-animation", null);
      setTimeout(this.emitLeftClick.bind(this), this.data.repeatClickEveryMs);
    }
  },
  emitRightClick: function() {
    console.log("right-click");
    if (this.isOnRightSide && this.data.rightButtonEnabled) {
      this.el.emit("dpad-right-click", null, true);
      this.rightBox.emit("start-animation", null);
      setTimeout(this.emitRightClick.bind(this), this.data.repeatClickEveryMs);
    }
  },
  remove: function() {
    this.trashable.forEach(function(element) {
      element.remove();
    });
  },
  update: function(oldData) {
    if (Object.keys(oldData).length === 0) {
      return;
    }

    console.log("update oldDate", oldData, 'newData', this.data);

    // update opacity for both button
    if (this.data.leftButtonEnabled !== oldData.leftButtonEnabled) {
      this.leftBox.setAttribute(
        "material", "opacity",
        this.data.leftButtonEnabled ? 1 : 0.2
      );
    }

    if (this.data.rightButtonEnabled !== oldData.rightButtonEnabled) {
      this.rightBox.setAttribute(
        "material", "opacity",
        this.data.rightButtonEnabled ? 1 : 0.2
      );
    }
  }
});
