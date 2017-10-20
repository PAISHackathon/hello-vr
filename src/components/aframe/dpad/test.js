require("aframe");
require("./index.js");

window.addEventListener("load", function(event) {
  let app = document.querySelector("#app");
  let container = document.createElement("a-entity");

  app.appendChild(container);

  let el = document.createElement("a-entity");
  el.setAttribute("dpad", "leftButtonEnabled: false");
  el.setAttribute("position", "-0.5 1.5 -2")
  el.setAttribute('scale', "0.5 0.5 0.5")
  
  container.appendChild(el)
  
});
