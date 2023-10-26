import Application from '../Application.js'
import Environment from './Environment.js'

import ComputerSetup from './Computer';



export default class World
{
    constructor()
    {
        this.application = new Application()
        this.scene = this.application.scene
        this.resources = this.application.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
         
            this.environment = new Environment()

            this.computerSetup = new ComputerSetup();

            console.log("this.computerSetup")
            console.log(this.computerSetup)
        })
        
    }

    update()
    {
    
        if (this.monitorScreen) this.monitorScreen.update();
        if (this.environment) this.environment.update();
    }
}