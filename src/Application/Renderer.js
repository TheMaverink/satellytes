import * as THREE from "three";
// import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";

import Application from "./Application";

import { WEBGL_WRAPPER_ID_NAME, WEBGL_ID_NAME } from "../config/consts";

export default class Renderer {
  constructor() {
    this.application = new Application();
    this.time = this.application.time;
    this.sizes = this.application.sizes;
    this.scene = this.application.scene;
    this.cssScene = this.application.cssScene;
    this.camera = this.application.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    this.instance.colorSpace = THREE.SRGBColorSpace;

    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    this.instance.setClearColor("#232721", 0.0);

    // this.instance.physicallyCorrectLights = true; //not beneficial when textures are baked
    this.instance.domElement.id = WEBGL_ID_NAME;
    this.instance.domElement.style.position = "absolute";
    this.instance.domElement.style.zIndex = "1px";
    this.instance.domElement.style.top = "0px";

    document
      .querySelector(`#${WEBGL_WRAPPER_ID_NAME}`)
      ?.appendChild(this.instance.domElement);

    //

    this.cssInstance = new CSS3DRenderer();
    this.cssInstance.setSize(this.sizes.width, this.sizes.height);
    this.cssInstance.domElement.style.position = "absolute";
    this.cssInstance.domElement.style.top = "0px";
    // this.cssInstance.domElement.style.border = "3px solid red";

    document.querySelector("#css")?.appendChild(this.cssInstance.domElement);

    this.uniforms = {
      u_time: { value: 1 },
    };
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    this.cssInstance.setSize(this.sizes.width, this.sizes.height);
  }

  update() {
    this.application.camera.instance.updateProjectionMatrix();

    if (this.uniforms) {
      this.uniforms.u_time.value = Math.sin(this.time.current * 0.01);
    }

    this.instance.render(this.scene, this.camera.instance);
    this.cssInstance.render(this.cssScene, this.camera.instance);
  }
}
