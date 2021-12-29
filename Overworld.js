class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;

    }

    startGameLoop(){
        const step = () => {

            //Clear off the canvas
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);



            //Establish camera person
            const cameraPerson = this.map.gameObjects.hero;

            //Update all objects
            Object.values(this.map.gameObjects).forEach(object =>{
                object.update({
                    arrow: this.directionInput.direction
                })
            })
            //Draw Lower Layer
            this.map.drawLowerImage(this.ctx, cameraPerson);

            //Draw Game Object
            Object.values(this.map.gameObjects).forEach(object => {
                    object.sprite.draw(this.ctx, cameraPerson);
                }
            )




            //Draw Upper Layer
            this.map.drawUpperImage(this.ctx, cameraPerson);


            requestAnimationFrame(() => {
                step();
            } )
        }
        step();
    }

    init(){
        this.map = new OverworldMap(window.OverworldMap.DemoRoom);

        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.directionInput.direction; // returns down or undefined

        this.startGameLoop();


    };
}