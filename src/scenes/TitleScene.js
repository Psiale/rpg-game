import 'phaser'

export default class TitleScene extends Phaser.Scene {
    constructor () {
        super('Title');
    }

    preload() {
        this.add.image(332.5, 150, 'gameLogo').setScale(1.8)
    }

    create() {
        // Game
this.fightButton = this.add.sprite(300.5, 350, 'fight-button').setInteractive();
this.optionsButton = this.add.sprite(322.5, 450, 'options-button').setInteractive();
this.scoreButton = this.add.sprite(322.5, 550, 'score-button').setInteractive();
this.creditsButton = this.add.sprite(322.5, 650, 'credits-button').setInteractive();
// this.centerButton(this.fightButton, 1);

// this.centerButton(this.optionsButton, 1)
// this.centerButton(this.scoreButton, 1)
 

this.fightButton.on('pointerdown', function (pointer) {
  this.scene.start('World');
}.bind(this));

this.creditsButton.on('pointerdown', function (pointer) {
    this.scene.start('Credit');
  }.bind(this));

  this.optionsButton.on('pointerdown', function (pointer) {
    this.scene.start('Options');
  }.bind(this));

  this.creditsTween = this.tweens.add({
  targets: this.creditsText,
  y: -100,
  ease: 'Power1',
  duration: 3000,
  delay: 1000,
  onComplete: function () {
    this.destroy;
  }
});
 
this.madeByTween = this.tweens.add({
  targets: this.madeByText,
  y: -300,
  ease: 'Power1',
  duration: 8000,
  delay: 1000,
  onComplete: function () {
    this.madeByTween.destroy;
    this.scene.start('Title');
  }.bind(this)
});
  

 
// this.input.on('pointerover', function (event, gameObjects) {
//   gameObjects[0].setTexture('blueButton2');
// });
 
// this.input.on('pointerout', function (event, gameObjects) {
//   gameObjects[0].setTexture('blueButton1');
// });
    }
}