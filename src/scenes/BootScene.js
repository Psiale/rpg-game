import 'phaser'


export default class BootScene extends Phaser.Scene {
    constructor () {
        super('Boot');
    }

    preload() {
        // map tiles
        this.load.image('tiles', 'map/spritesheet.png')

        // map in the json format
        this.load.tilemapTiledJSON('map', 'map/map.json');
        this.load.spritesheet('player', 'character_assets.png', { frameWidth: 20, frameHeight: 24})
    }

    create() {
        this.scene.start('World')
    }
}