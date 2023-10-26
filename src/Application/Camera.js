import * as THREE from 'three'
import Application from './Application.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class Camera
{
    constructor()
    {
        this.application = new Application()
        console.log("this.application!!!!")
        console.log(this.application)
        this.sizes = this.application.sizes
        this.scene = this.application.scene
        this.renderer = this.application.renderer;
        this.resources = this.application.resources;
        this.time = this.application.time;

        this.position = new THREE.Vector3(0, 0, 0);
        this.focalPoint = new THREE.Vector3(0, 0, 0);

        this.setInstance()
        // this.setControls()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            10,
            900000
        );
        // this.currentKeyframe = CameraKey.LOADING;

        this.scene.add(this.instance);
    }

    // setInstance()
    // {
    //     this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
    //     this.instance.position.set(6, 4, 8)
    //     this.scene.add(this.instance)
    // }

    // setControls()
    // {
    //     console.log("this.instance")
    //     console.log(this.instance)
  
    //     this.controls = new OrbitControls(this.instance, this.renderer.instance.domElement)
    //     this.controls.enableDamping = true
    // }

    resize()
    {

        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        // this.controls.update()
        // this.instance.lookAt(this.focalPoint);
        console.log("camera update ")
    }
}