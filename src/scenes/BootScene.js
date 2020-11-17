import 'phaser'


export default class BootScene extends Phaser.Scene {
    constructor () {
        super('Boot');
    }

    preload() {
        // map tiles
        this.load.image('tiles', 'map/map.png')
        // this.load.image('oTiles', 'map/o_spritesheet.png')

        // map in the json format
        this.load.tilemapTiledJSON('map', 'map/mymap.json');   
        this.load.spritesheet('player', 'character_assets.png', { frameWidth: 32, frameHeight: 43})
        this.load.spritesheet('player_retro', 'character_retro.png', {frameWidth: 66, frameHeight:100})
    }

    create() {
        this.scene.start('World', {tiles: this.oTiles })
    }
}