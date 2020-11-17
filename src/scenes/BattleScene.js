import 'phaser'


export default class BattleScene extends Phaser.Scene {
    constructor () {
        super('Battle');
    }

    create() {
        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
        this.scene.launch('UI',)
    }
}