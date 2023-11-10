import * as THREE from "three";
import Application from "../Application";
import EventEmitter from "../Utils/EventEmitter";
import TWEEN from "@tweenjs/tween.js";
import UIEventBus from "../UI/EventBus";
import BezierEasing from "bezier-easing";
import {
  MonitorKeyframe,
  IdleKeyframe,
  LoadingKeyframe,
} from "./CameraKeyframes";

export const CameraKey = {
  LOADING: "loading",
  IDLE: "idle",
  MONITOR: "monitor",
};

export default class Camera extends EventEmitter {
  constructor() {
    super();
    this.application = new Application();
    this.sizes = this.application.sizes;
    this.scene = this.application.scene;
    this.renderer = this.application.renderer;
    this.resources = this.application.resources;
    this.time = this.application.time;
    this.debug = this.application.debug;

    this.position = new THREE.Vector3(0, 0, 0);
    this.focalPoint = new THREE.Vector3(0, 0, 0);

    this.keyframes = {
      idle: new IdleKeyframe(),
      monitor: new MonitorKeyframe(),
      loading: new LoadingKeyframe(),
    };

    document.addEventListener("mousedown", (event) => {
      // UIEventBus.dispatch("freeCamToggle", true);

      console.log("MOUSE DOWN!!!!");
      console.log("this.currentKeyframe");
      console.log(this.currentKeyframe);
      console.log("this.targetKeyframe");
      console.log(this.targetKeyframe);
      event.preventDefault();

      if (event.target.id === "prevent-click") return;

      if (
        this.currentKeyframe === CameraKey.IDLE ||
        this.targetKeyframe === CameraKey.IDLE
      ) {
        this.transition(CameraKey.MONITOR);
      } else if (
        this.currentKeyframe === CameraKey.MONITOR ||
        this.targetKeyframe === CameraKey.MONITOR
      ) {
        this.transition(CameraKey.IDLE);
      }
      //   this.transition(CameraKey.MONITOR);
    });

    this.setPostLoadTransition();
    this.setInstance();
    this.setMonitorListeners();
    // this.setFreeCamListeners();
  }

  transition(key, duration = 1000, easing, callback) {
    if (this.currentKeyframe === key) return;

    if (this.targetKeyframe) TWEEN.removeAll();

    this.currentKeyframe = undefined;
    this.targetKeyframe = key;

    const keyframe = this.keyframes[key];

    const posTween = new TWEEN.Tween(this.position)
      .to(keyframe.position, duration)
      .easing(easing || TWEEN.Easing.Quintic.InOut)
      .onComplete(() => {
        this.currentKeyframe = key;
        this.targetKeyframe = undefined;
        if (callback) callback();
      });

    const focTween = new TWEEN.Tween(this.focalPoint)
      .to(keyframe.focalPoint, duration)
      .easing(easing || TWEEN.Easing.Quintic.InOut);

    posTween.start();
    focTween.start();
  }

  setInstance() {
    // PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      900000
    );

    this.currentKeyframe = CameraKey.IDLE;

    this.scene.add(this.instance);
  }

  setMonitorListeners() {
    this.on("enterMonitor", () => {
      this.transition(CameraKey.MONITOR, 2000, BezierEasing(0.13, 0.99, 0, 1));
      UIEventBus.dispatch("enterMonitor", {});
    });
    // this.on("leftMonitor", () => {
    //   this.transition(CameraKey.DESK);
    //   UIEventBus.dispatch("leftMonitor", {});
    // });
  }

  setPostLoadTransition() {
    UIEventBus.on("loadingScreenDone", () => {
      this.transition(CameraKey.IDLE, 2500, TWEEN.Easing.Exponential.Out);
    });
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    TWEEN.update();

    // if (this.freeCam && this.orbitControls) {
    //   this.position.copy(this.orbitControls.object.position);
    //   this.focalPoint.copy(this.orbitControls.target);
    //   this.orbitControls.update();
    //   return;
    // }

    for (const key in this.keyframes) {
      const _key = key;
      this.keyframes[_key].update();
    }

    if (this.currentKeyframe) {
      const keyframe = this.keyframes[this.currentKeyframe];
      this.position.copy(keyframe.position);
      this.focalPoint.copy(keyframe.focalPoint);
    }

    this.instance.position.copy(this.position);
    this.instance.lookAt(this.focalPoint);
  }
}
