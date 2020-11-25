import * as localStorage from '../helpers/localStorage';
import 'phaser';


export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', 'logo.png');
  }

  create() {
    localStorage.saveItem('numberOfZones', 7);
    localStorage.saveItem('score', 0);
    localStorage.saveItem('heroHp', 125);
    this.scene.start('Preloader');
  }
}