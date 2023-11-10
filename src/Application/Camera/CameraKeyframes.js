import * as THREE from "three";
import Time from "../Utils/Time";
import Application from "../Application";
import Mouse from "../Utils/Mouse";
import Sizes from "../Utils/Sizes";

export class CameraKeyframeInstance {
  constructor(keyframe) {
    this.position = keyframe.position;
    this.focalPoint = keyframe.focalPoint;
  }

  update() {}
}

const keys = {
  loading: {
    position: new THREE.Vector3(5, 4, 5),
    focalPoint: new THREE.Vector3(0, 0.5, 0),
  },
  idle: {
    position: new THREE.Vector3(5, 4, 5),
    focalPoint: new THREE.Vector3(0, 0.5, 0),
  },
  // monitor: {
  //   position: new THREE.Vector3(-0.1, 0.9, -0.3),
  //   focalPoint: new THREE.Vector3(
  //     -1.489284634590149,
  //     0.40464597940444946,
  //     -0.3812241554260254
  //   ),
  // },
  monitor: {
    position: new THREE.Vector3(
      -0.6,
      0.7340575084090233,
      -0.37934163957834244
    ),
    focalPoint: new THREE.Vector3(
      -1.1790668070316315,
      0.7340575084090233,
      -0.37934163957834244
    ),
  },

  // monitor: {
  //   position: new THREE.Vector3(
  //     -1.489284634590149,
  //     0.40464597940444946,
  //     -0.3812241554260254
  //   ),
  //   focalPoint: new THREE.Vector3(
  //     -1.489284634590149,
  //     0.40464597940444946,
  //     -0.3812241554260254
  //   ),
  // },
};

export class LoadingKeyframe extends CameraKeyframeInstance {
  constructor() {
    const keyframe = keys.loading;
    super(keyframe);
  }

  update() {}
}

export class IdleKeyframe extends CameraKeyframeInstance {
  // time: Time;
  // origin: THREE.Vector3;

  constructor() {
    const keyframe = keys.idle;
    super(keyframe);
    this.origin = new THREE.Vector3().copy(keyframe.position);
    this.time = new Time();
  }

  update() {
    this.position.x =
      Math.sin((this.time.elapsed + 19000) * 0.00008 * this.origin.x) / 2;

    this.position.y =
      Math.sin((this.time.elapsed + 19000) * 0.000008) + this.origin.y;
    this.position.z = this.position.z;
  }
}

export class MonitorKeyframe extends CameraKeyframeInstance {
  constructor() {
    const keyframe = keys.monitor;
    super(keyframe);
    this.application = new Application();
    this.sizes = this.application.sizes;

    this.origin = new THREE.Vector3().copy(keyframe.position);
    this.targetPos = new THREE.Vector3().copy(keyframe.focalPoint);
  }

  update() {
    const aspect = this.sizes.height / this.sizes.width;

    const additionalZoom = this.sizes.width < 768 ? 0 : 1;

    // const targetPoint = new THREE.Vector3(
    //   -1.489284634590149,
    //   0.40464597940444946,
    //   -0.3812241554260254
    // );

    // const targetPoint = new THREE.Vector3(-1.17531, 0.377832, 0.729156);

    // const distance = 1; // Unity distance

    // const cameraPosition = new THREE.Vector3(
    //   targetPoint.x,
    //   targetPoint.y,
    //   targetPoint.z - distance
    // );

    // const upVector = new THREE.Vector3(0, 0, 1); // Adjust based on your needs
    // this.position.copy(cameraPosition);

    // this.up.copy(upVector);

    // this.targetPos.z = this.origin.z + aspect * 1200 - additionalZoom;
    // this.targetPos.z = this.origin.z;
    //  this.position.copy(cameraPosition.up(upVector));
    // const angleInRadians = THREE.MathUtils.degToRad(1);
    // this.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), angleInRadians);
  }
}
