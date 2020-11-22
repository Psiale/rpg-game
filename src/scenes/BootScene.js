import * as localStorage from '../helpers/localStorage'
import 'phaser'


export default class BootScene extends Phaser.Scene {
    constructor () {
        super('Boot');
    }

    preload() {
        // map tiles
        // this.load.image('tiles', 'map/map.png')
        // this.load.image('player_retro_fight', 'character_retro_back.png')
        // this.load.spritesheet('boss1', 'boss1.png', {frameWidth: 127, frameHeight: 125})
        // this.load.spritesheet('boss2', 'boss2.png', {frameWidth: 127, frameHeight: 125})
        // this.load.spritesheet('boss3', 'boss3.png', {frameWidth: 127, frameHeight: 125})
        // this.load.spritesheet('boss4', 'boss4.png', {frameWidth: 127, frameHeight: 125})
        // this.load.spritesheet('boss5', 'boss5.png', {frameWidth: 127, frameHeight: 125})
        // this.load.spritesheet('boss6', 'boss6.png', {frameWidth: 127, frameHeight: 125})
        // // map in the json format
        // this.load.tilemapTiledJSON('map', 'map/mymap.json');
        // this.load.spritesheet('player_retro', 'character_retro.png', {frameWidth: 66, frameHeight:100, setScale: .8})

        // following the templates tutorial 
        this.load.image('logo', 'logo.png')
    }

    create() {
        localStorage.saveItem('heroHp', 100)
        this.scene.start('Preloader')
    }
}