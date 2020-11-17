import 'phaser'


export default class UIScene extends Phaser.Scene {
    constructor () {
        super('UI');
    }

    create() {
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);
        this.graphics.strokeRect(20, 600, 215, 100);
        this.graphics.fillRect(20, 600, 215, 100);
        this.graphics.strokeRect(216, 600, 215, 100);
        this.graphics.fillRect(216, 600, 215, 100);
        this.graphics.strokeRect(431, 600, 195, 100);
        this.graphics.fillRect(431, 600, 195, 100);
        }
}