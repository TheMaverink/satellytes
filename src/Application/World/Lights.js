import * as THREE from "three";

import Application from "../Application.js";

export default class Lights {
  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;

    this.debug = this.application.debug;

    this.setLights();
  }

  setLights() {
    const ambientLight = new THREE.AmbientLight(0x404040, 100);

    const sunLight = new THREE.DirectionalLight("#ffffff", 4);
    sunLight.castShadow = true;
    sunLight.shadow.camera.far = 15;
    sunLight.shadow.mapSize.set(1024, 1024);
    sunLight.shadow.normalBias = 0.05;
    sunLight.position.set(3.5, 2, -1.25);

    this.scene.add(ambientLight);

    if (this.debug.active) {
      this.lightsDebugFolder = this.debug.ui.addFolder("Lights");
      this.lightsDebugFolder
        .add(ambientLight, "intensity", 0, 1000)
        .name("Ambient Light Intensity");

      this.lightsDebugFolder
        .add(ambientLight, "intensity", 0, 1000)
        .name("SunLight Light Intensity");


      // Add controls for the sun light's properties
      this.lightsDebugFolder.addColor(sunLight, "color").name("Color");
      this.lightsDebugFolder.add(sunLight, "intensity", 0, 10).name("Intensity");
      this.lightsDebugFolder.add(sunLight, "castShadow").name("Cast Shadow");
      this.lightsDebugFolder
        .add(sunLight.shadow.camera, "far", 0, 20)
        .name("Shadow Camera Far");
      this.lightsDebugFolder
        .add(sunLight.shadow.mapSize, "width", 512, 4096)
        .name("Shadow Map Width");
      this.lightsDebugFolder
        .add(sunLight.shadow.mapSize, "height", 512, 4096)
        .name("Shadow Map Height");
      this.lightsDebugFolder
        .add(sunLight.shadow, "normalBias", 0, 1)
        .name("Shadow Normal Bias");
    }
  }

  update() {
    if (this.monitorScreen) this.monitorScreen.update();
    if (this.environment) this.environment.update();
  }
}
