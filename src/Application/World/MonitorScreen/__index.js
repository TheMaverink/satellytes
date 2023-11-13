import * as THREE from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';

// import GUI from 'lil-gui';
import Application from "../../Application";
// import Debug from '../Utils/Debug';
// import Resources from '../Utils/Resources';
// import Sizes from '../Utils/Sizes';
// import Camera from '../Camera/Camera';
import EventEmitter from "../../Utils/EventEmitter";

const SCREEN_SIZE = { w: 1280/1, h: 1024 /2};
const IFRAME_PADDING = 32;
const IFRAME_SIZE = {
  w: SCREEN_SIZE.w - IFRAME_PADDING,
  h: SCREEN_SIZE.h - IFRAME_PADDING,
};

export default class MonitorScreen extends EventEmitter {
  constructor() {
    super();
    this.application = new Application();
    this.scene = this.application.scene;
    this.cssScene = this.application.cssScene;
    // this.sizes = this.application.sizes;
    this.resources = this.application.resources;

    this.screenSize = new THREE.Vector2(SCREEN_SIZE.w, SCREEN_SIZE.h);

    const canvas = document.querySelector("canvas")

    console.log("this.application.camera")
    console.log(this.application.camera)

    // this.controls = new OrbitControls(this.application.camera.instance,canvas )


    // this.camera = this.application.camera;
    // this.position = new THREE.Vector3(0, 850, 255);
     this.position = new THREE.Vector3(
       -1,
       0.7340575084090233,
       -0.37934163957834244
     );

    // this.position = new THREE.Vector3(0, 0, 0);

    // this.rotation = new THREE.Euler(
    //   -3 * THREE.MathUtils.DEG2RAD,
    //   90 * THREE.MathUtils.DEG2RAD,
    //   0
    // );

    this.rotation = new THREE.Euler(
      -3 * THREE.MathUtils.DEG2RAD,
      90 * THREE.MathUtils.DEG2RAD,
      0
    );

    //  this.rotation = new THREE.Euler(-3 * THREE.MathUtils.DEG2RAD, 180, 180);
    // this.videoTextures = {};
    // this.mouseClickInProgress = false;
    // this.shouldLeaveMonitor = false;

    this.createIframe();
  }

  /**
   * Creates the iframe for the computer screen
   */
  createIframe() {
    // Create container
    // const container = document.createElement("div");
    // container.id = "iframe-container"
    // container.style.width = this.screenSize.width + "px";
    // container.style.height = this.screenSize.height + "px";
    // container.style.opacity = "1";
    // // container.style.background = "red";

    // container.style.background = "#1d2e2f";

    // Create iframe
    const iframe = document.createElement("iframe");

     iframe.src = "https://henryheffernan-os.vercel.app/";

    // iframe.src = "https://www.splinegroup.ca/"

    // iframe.src = "https://dribbble.com/"

    // const urlParams = new URLSearchParams(window.location.search);
    // if (urlParams.has("dev")) {
    //   iframe.src = "http://localhost:3000/";
    // }
    iframe.style.width = this.screenSize.width + "px";
    iframe.style.height = this.screenSize.height + "px";

    // iframe.style.padding = IFRAME_PADDING + "px";
    iframe.style.boxSizing = "border-box";
    iframe.style.opacity = "1";

    // iframe.className = "jitter";
    // iframe.id = "computer-screen";
    // iframe.frameBorder = "0";
    // iframe.title = "HeffernanOS";
    // iframe.style.border = "1px solid orange";
    // Add iframe to container
    // container.appendChild(iframe);

    // Create CSS plane
    this.createCssPlane(iframe);
  }

  /**
   * Creates a CSS plane and GL plane to properly occlude the CSS plane
   * @param element the element to create the css plane for
   */
  createCssPlane(element) {
    // Create CSS3D object
    const object = new CSS3DObject(element);

    // copy monitor position and rotation
    object.position.copy(this.position);
    object.rotation.copy(this.rotation);
    object.scale.set(1, 1, 1);

    // Add to CSS scene
    this.cssScene.add(object);

    // Create GL plane
    const material = new THREE.MeshLambertMaterial({ color: "blue" });
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

    mesh.scale.copy(object.scale);

    // mesh.scale.multiplyScalar(1/2)

    console.log("element")
    console.log(element)

    //iframe container dom  el

    console.log("object")
    console.log(object)

//     x
// : 
// -1
// y
// : 
// 0.7340575084090233
// z
// : 
// -0.37934163957834244

    console.log("mesh")
    console.log(mesh)

//     x
// : 
// -1
// y
// : 
// 0.7340575084090233
// z
// : 
// -0.37934163957834244

    // Add to gl scene
    this.scene.add(mesh);

    this.scene.add(new THREE.AmbientLight());
  }

  update() {

  }
}
