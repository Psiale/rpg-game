export default class WorldScene extends Phaser.Scene {
    constructor(){
        super('World')
    }
    preload() {

    }

    create() {
        const map = this.make.tilemap({ key: 'map'})   
        const tiles = map.addTilesetImage('spritesheet', 'tiles')
        const grass = map.createStaticLayer('Grass', tiles, 0, 0);
        const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
        obstacles.setCollisionByExclusion([-1]);
    }
}