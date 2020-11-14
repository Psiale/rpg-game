import 'phaser'

import PreloaderScene from './scenes/PreloaderScene'
import TitleScene from './scenes/TitleScene'
import OptionsScene from './scenes/OptionsScene'
import CreditsScene from './scenes/CreditsScene'
import BootScene from './scenes/BootScene'
import WorldScene from './scenes/WorldScene'

const config = {
    type: Phaser.AUTO,
    width: 700,
    height: 500,
    zoom: 2,
    backgroundColor: '4d99ff',
    parent: 'divId',
    dom: {
      createContainer: true,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
      },
    },
    pixelArt: true,
    roundPixels: true,
  };
  
  const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars  
  
  game.scene.add('Boot',BootScene)
  game.scene.add('World', WorldScene)
  game.scene.start('Boot')