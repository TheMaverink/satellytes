import Application from "../Application";

export default class Helper {


    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;

    }

    // tick() {
    //     const currentTime = Date.now();
    //     this.delta = currentTime - this.current;
    //     this.current = currentTime;
    //     this.elapsed = this.current - this.start;

    //     this.trigger('tick');

    //     window.requestAnimationFrame(() => {
    //         this.tick();
    //     });
    // }
}
