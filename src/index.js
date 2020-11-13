import 'phaser'
import config from './Config/config'
import GameScene from './scenes/GameScene'
import BootScene from './scenes/BootScene'
import PreloaderScene from './scenes/PreloaderScene'
import TitleScene from './scenes/TitleScene'
import OptionsScene from './scenes/OptionsScene'
import CreditsScene from './scenes/CreditsScene'

class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add('Game', GameScene)
        this.scene.start('Game');
    }
}

window.game = new Game();