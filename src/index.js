import 'phaser'
import PreloaderScene from './scenes/PreloaderScene'
import TitleScene from './scenes/TitleScene'
import OptionsScene from './scenes/OptionsScene'
import CreditsScene from './scenes/CreditsScene'
import BootScene from './scenes/BootScene'
import WorldScene from './scenes/WorldScene'
import BattleScene from './scenes/BattleScene'
import UIScene from './scenes/UIScene'

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 570,
    backgroundColor: '4d99ff',
    parent: 'divId',
    dom: {
      createContainer: true,
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: {y: 0, x: 0 },
      },
    },
    pixelArt: true,
    roundPixels: true,
  };
  
  const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars  
  
  game.scene.add('Boot',BootScene)
  game.scene.add('World', WorldScene)
  game.scene.add('Battle', BattleScene )
  game.scene.add('UI', UIScene )
  game.scene.start('Boot')