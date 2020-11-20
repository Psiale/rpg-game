import 'phaser'

export default class TitleScene extends Phaser.Scene {
    constructor () {
        super('Title');
    }

    preload() {

    }

    create() {
        // Game
this.fightButton = this.add.sprite(322.5, 200, 'fight-button').setInteractive();
this.optionsButton = this.add.sprite(322.5, 300, 'options-button').setInteractive();
this.scoreButton = this.add.sprite(322.5, 400, 'score-button').setInteractive();
this.creditsButton = this.add.sprite(322.5, 500, 'credits-button').setInteractive();
// this.centerButton(this.fightButton, 1);

// this.centerButton(this.optionsButton, 1)
// this.centerButton(this.scoreButton, 1)
 

this.fightButton.on('pointerdown', function (pointer) {
  this.scene.start('World');
}.bind(this));

this.creditsButton.on('pointerdown', function (pointer) {
    this.scene.start('Credit');
  }.bind(this));
  

 
// this.input.on('pointerover', function (event, gameObjects) {
//   gameObjects[0].setTexture('blueButton2');
// });
 
// this.input.on('pointerout', function (event, gameObjects) {
//   gameObjects[0].setTexture('blueButton1');
// });
    }
}