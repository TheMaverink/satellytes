
import Application from "../Application.js";


import Room from "./Room.js";
// import MonitorScreen from './MonitorScreen';

import Lights from "./Lights";

export default class World {
  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.resources = this.application.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      this.room = new Room();
      // this.monitorScreen = new MonitorScreen();
    });
  }

  update() {

    if (this.monitorScreen) this.monitorScreen.update();
    // if (this.environment) this.environment.update();
  }
}
