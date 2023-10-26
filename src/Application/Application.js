import * as THREE from "three";
import Stats from "stats.js";

import Debug from "./Utils/Debug.js";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";

import Loading from "./Utils/Loading";

import sources from "./sources.js";

import UI from "./UI";

import isOnDebugMode from "../utils/isOnDebugMode.js";

let instance = null;

export default class Application {
  constructor() {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.application = this;

    // Options
    // this.canvas = _canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.loading = new Loading();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    this.ui = new UI();

    console.log("this.ui");
    console.log(this.ui);

    const isDebug = isOnDebugMode();

    if (isDebug) {
      this.stats = new Stats();
      this.stats.showPanel(0);
      document.body.appendChild(this.stats.dom);
    }

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    if (this.stats) this.stats.begin();
    this.camera.update();
    this.renderer.update();
    this.world.update();
    if (this.stats) this.stats.end();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    // this.camera.controls.dispose(); // remove?
    this.renderer.instance.dispose();

    if (this.debug.active) this.debug.ui.destroy();
  }
}
