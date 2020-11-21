import 'phaser'
import PreloaderScene from './scenes/PreloaderScene'
import TitleScene from './scenes/TitleScene'
import OptionsScene from './scenes/OptionsScene'
import CreditsScene from './scenes/CreditsScene'
import BootScene from './scenes/BootScene'
import WorldScene from './scenes/WorldScene'
import {BattleScene, UIScene } from './scenes/BattleScene'

const config = {
    type: Phaser.AUTO,
    width: 645,
    height: 720,
    backgroundColor: '000000',
    parent: 'divId',
    dom: {
      createContainer: true,
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: {y: 0, x: 0 },
      },
    },
    pixelArt: true,
    roundPixels: true,
  };
  
  class Game extends Phaser.Game {
    constructor() {
      super(config)
      this.scene.add('Boot',BootScene)
      this.scene.add('Preloader', PreloaderScene)
      this.scene.add('Title', TitleScene)
      this.scene.add('Options', OptionsScene)
      this.scene.add('Credit', CreditsScene )
      this.scene.add('World', WorldScene)
      this.scene.add('Battle', BattleScene )
      this.scene.add('UI', UIScene )
      this.scene.start('Boot')
    }
  }

  // const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars  
  
  // game.scene.add('Boot',BootScene)
  // game.scene.add('Preloader', PreloaderScene)
  // game.scene.add('Title', TitleScene)
  // game.scene.add('Options', OptionsScene)
  // game.scene.add('Credit', CreditsScene )
  // game.scene.add('World', WorldScene)
  // game.scene.add('Battle', BattleScene )
  // game.scene.add('UI', UIScene )
  // game.scene.start('Boot')

  window.game = new Game();