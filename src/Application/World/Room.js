import * as THREE from "three";

import Application from "../Application";
import BakedModel from "../Utils/BakedModel";

export default class Room {
  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.resources = this.application.resources;
    this.bakeModel();
    this.setModel();
  }

  bakeModel() {
    this.bakedModel = new BakedModel(
      this.resources.items.gltfModel.roomModel,
      this.resources.items.texture.roomTexture,
      1
    );
  }

  setModel() {
    // this.bakedModel.model.scene.rotation.y = -Math.PI / 2;

    console.log(" this.bakedModel.model");
    console.log(this.bakedModel.model);

    // const boundingBox = new THREE.Box3().setFromObject(this.bakedModel.model);

    this.scene.add(this.bakedModel.getModel());

    const screenObj = this.bakedModel.getModel();

    //find center of monitor
    screenObj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.name === "screen1") {
          const boundingBox = new THREE.Box3().setFromObject(child);


          const boundingBoxSize = new THREE.Vector3();

          boundingBox.getSize(boundingBoxSize);

          console.log("boundingBox");
          console.log(boundingBox);

          console.log("boundingBoxSize");
          console.log(boundingBoxSize);

          const boundingBoxHelper = new THREE.Box3Helper(boundingBox, "red"); // You can specify the color you want

          // Add the bounding box helper to your scene
          this.scene.add(boundingBoxHelper);

          const center = new THREE.Vector3();
          boundingBox.getCenter(center);

          console.log("center");
          console.log(center);
        }else{
          console.log("child")
          console.log(child)

          child.visible = false
        }
      }
    });
  }
}
