import * as THREE from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import Application from "../../Application";
import EventEmitter from "../../Utils/EventEmitter";

// 0.011072933673858643
// 0.20848019421100616
// 0.25013400614261627

// const SCREEN_SIZE = { w: 1.280, h: 1.024 };
const SCREEN_SIZE = { w: 0.25013400614261627, h: 0.20848019421100616 };
const IFRAME_PADDING = 32;

const IFRAME_SIZE = {
  w: SCREEN_SIZE.w - IFRAME_PADDING,
  h: SCREEN_SIZE.h - IFRAME_PADDING,
};

const screen_position = new THREE.Vector3(
  -1.16,
  0.7340575084090233,
  -0.37934163957834244
);

export default class MonitorScreen extends EventEmitter {
  constructor() {
    super();
    this.application = new Application();
    this.scene = this.application.scene;
    this.cssScene = this.application.cssScene;

    this.screenSize = new THREE.Vector2(SCREEN_SIZE.w, SCREEN_SIZE.h);

    // this.rotation = new THREE.Euler(
    //   -3 * THREE.MathUtils.DEG2RAD,
    //   90 * THREE.MathUtils.DEG2RAD,
    //   0
    // );

    this.rotation = new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0);

    this.position = screen_position;

    // Create iframe
    const iframe = document.createElement("iframe");
    iframe.src = "https://days.christou1910.com/en/";

    iframe.style.width = this.screenSize.width + "px";
    iframe.style.height = this.screenSize.height + "px";
    // iframe.style.padding = IFRAME_PADDING + "px";
    iframe.style.boxSizing = "border-box";
    iframe.style.opacity = "1";

    // iframe.className = "jitter";
    // iframe.id = "computer-screen";
    iframe.frameBorder = "1";
    // iframe.title = "HeffernanOS";
    // iframe.style.border = "1px solid orange";
    // Create CSS plane
    // Create CSS3D object
    const object = new CSS3DObject(iframe);

    // copy monitor position and rotation
    object.position.copy(this.position);
     object.rotation.copy(this.rotation);

    // object.rotation = new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0);
    object.scale.set(1, 1, 1);

    // Add to CSS scene
    this.cssScene.add(object);

    // Create GL plane
    const material = new THREE.MeshLambertMaterial();
    material.side = THREE.DoubleSide;
    material.opacity = 0;
    material.transparent = true;
    // NoBlending allows the GL plane to occlude the CSS plane
    material.blending = THREE.NoBlending;

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(
      this.screenSize.width,
      this.screenSize.height
    );

    // Create the GL plane mesh
    const mesh = new THREE.Mesh(geometry, material);

    // Copy the position, rotation and scale of the CSS plane to the GL plane
    mesh.position.copy(object.position);
    mesh.rotation.copy(object.rotation);

    // mesh.rotation = new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0);


    mesh.scale.copy(object.scale);

    console.log("object");
    console.log(object)

    console.log("mesh");
    console.log(mesh);
    this.scene.add(mesh);

    console.log(this)

    this.scene.add(new THREE.AmbientLight());
  }

  update() {}
}
