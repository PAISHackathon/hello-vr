require("aframe");
require("./index.js");

window.addEventListener("load", function(event) {
  const arc = Math.PI / 2;
  let el = document.createElement("a-entity");
  el.setAttribute("half-pipe", { radius: 10, plane: "xz", arc });
  el.setAttribute("position", { x: 0, y: 1, z: 0 });
  el.setAttribute("rotation", { x: 0, y: 180 - (Math.PI - arc)/2*57.2958, z: 0 });

  let app = document.querySelector("#app");
  console.log(app);
  app.appendChild(el);
  console.log(el);

  for (let i = 0; i < 5; i++) {
    let box = document.createElement("a-entity");
    box.setAttribute("geometry", { primitive: "box" });
    el.appendChild(box);
    console.log(box);
  }
});
