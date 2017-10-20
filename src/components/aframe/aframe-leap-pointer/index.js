import AFRAME from "aframe";
import Leap from "leapjs";

let hint_elements = [];

function debug(...theArgs) {
  if (this.data.debug) console.log(this, theArgs);
}

function installHintElement(scene, hand_class) {
  let hint_element = document.createElement("a-entity");
  hint_element.setAttribute("class", `hintElement ${hand_class}`);
  hint_element.setAttribute("position", "0 0 0");
  hint_element.setAttribute("geometry", "primitive: sphere; radius: 0.05;");
  scene.appendChild(hint_element);
  return hint_element;
}

function uninstallHintElements() {
  hint_elements.forEach(elm => {
    elm.remove();
  });
}

function leapPointToWorld(leapPoint, iBox) {
  let normalized = iBox.normalizePoint(leapPoint, false);
  //console.log('normalized', normalized)
  let z = normalized[2];
  let y = normalized[1];
  let x = normalized[0];
  const aframe_scale = 2; // interaction box height
  const lift_y = 0;
  // if changing from right-hand to left-hand rule, use:
  // z = normalized[2] * -1.0;
  //recenter origin
  x -= 1;
  y -= 1;
  z -= 1;

  //scale
  x *= aframe_scale;
  y = y * aframe_scale + lift_y;
  z *= aframe_scale;
  return Leap.vec3.fromValues(x, y, z);
}

function updateRaycasters(data, currentElement, raycaster, hint_element, hmdMode) {
  debug(data);
  let tipPosition = data.position;
  let direction = data.direction;
  let interaction_box = data.interaction_box;

  let real_world_pos = leapPointToWorld(tipPosition, interaction_box);

  // this, works
  currentElement.setAttribute("position", {
    x: real_world_pos[0],
    y: real_world_pos[1],
    z: real_world_pos[2]
  });

  //console.log('pointable dir', direction)
  let tipPosVec = new THREE.Vector3(
    tipPosition[0],
    tipPosition[1],
    tipPosition[2]
  );
  let realWorldPosVec = new THREE.Vector3(
    real_world_pos[0],
    real_world_pos[1],
    real_world_pos[2]
  );
  let dirVec = new THREE.Vector3(direction[0], direction[1], direction[2]);

  let focalPoint = dirVec.multiplyScalar(5); //new THREE.Vector3();

  // be more sensitive
  focalPoint.x *= 2;
  focalPoint.y *= 2;
  //focalPoint.addVectors(realWorldPosVec, dirVec.multiplyScalar(5));

  hint_element.setAttribute("position", {
    x: focalPoint.x,
    y: focalPoint.y,
    z: focalPoint.z
  });

  debug("direction", dirVec);

  raycaster.object3D.lookAt(hmdMode? focalPoint: focalPoint.negate());
}

AFRAME.registerComponent("aframe-leap-pointer", {
  dependencies: ["raycaster"],
  schema: {
    isLeftHand: {
      type: "boolean",
      default: false
    },
    debug: {
      type: "boolean",
      default: true
    },
    hmdMode: {
      type: "boolean",
      default: false
    }
  },

  remove() {
    uninstallHintElements();
  },

  update(oldData) {
    let el = this.el;
    let self = this;
    const pointer_class = this.data.isLeftHand ? "left" : "right";

    debug("data changes from", oldData, "to", this.data);

    uninstallHintElements();
    this.hint_element = installHintElement(el.sceneEl, pointer_class);

    debug("relevant hint element", this.hint_element);

    // install event listener
    this.el.addEventListener(
      `${self.data.isLeftHand ? "left" : "right"}-hand-cursor-position`,
      function(ev) {
        debug(
          "updating element and raycaster",
          self.data.isLeftHand ? "left" : "right"
        );
        updateRaycasters(ev.detail, el, self.raycaster, self.hint_element, self.data.hmdMode);
      }
    );

    // Leap loop
    Leap.loop(
      { enableGestures: false, optimizeHMD: this.data.hmdMode },
      function(frame) {
        //console.log("hands", frame.hands);

        if (self.isPaused) {
          debug("paused");
          return;
        }

        // hand based
        if (frame.valid && frame.hands.length > 0) {
          let right_hand_ids = [],
            left_hand_ids = [];

          right_hand_ids = frame.hands.filter(hand => {
            return hand.type == "right";
          });

          left_hand_ids = frame.hands.filter(hand => {
            return hand.type == "left";
          });

          debug(self.data.isLeftHand ? "left" : "right");
          debug("right_hand_ids: ", right_hand_ids.length);
          debug("left_hand_ids: ", left_hand_ids.length);

          let current_hand;
          // find pointables for index finger
          if (right_hand_ids.length > 0) {
            current_hand = frame.hand(right_hand_ids[0].id);
            debug("right hand emit?", self.data.isLeftHand);
            if (self.data.isLeftHand == false) {
              el.emit("right-hand-cursor-position", {
                position: current_hand.stabilizedPalmPosition,
                direction: current_hand.direction,
                interaction_box: frame.interactionBox
              });
            }
          }

          if (left_hand_ids.length > 0) {
            current_hand = frame.hand(left_hand_ids[0].id);

            if (self.data.isLeftHand) {
              debug("left hand emit");
              el.emit("left-hand-cursor-position", {
                position: current_hand.stabilizedPalmPosition,
                direction: current_hand.direction,
                interaction_box: frame.interactionBox
              });
            }
            //this.el.emit('left-hand-cursor-position', { position: hand.stabilizedPalmPosition, direction: hand.direction, interaction_box: frame.interactionBox })
          }
        }
      }
    )/*.use('transform', {
      vr: self.data.hmdMode
    });*/
  },

  pause() {
    this.isPaused = true;
  },

  play() {
    this.isPaused = false;
  },

  init: function() {
    let el = this.el;
    let self = this;

    self.isPaused = false;
    debug = debug.bind(this);

    // add own raycaster
    self.raycaster = document.createElement("a-entity");
    self.raycaster.setAttribute("raycaster", {
      showLine: self.data.debug,
      objects: ".collidable"
    });

    self.raycaster.setAttribute("line", { color: "red", opacity: 0.8 });
    el.appendChild(self.raycaster);

    function realTimeIsLeftHand() {
      return self.data.isLeftHand;
    }
  }
});

export default {};
