import "phaser";
import * as LocalStorage from '../helpers/localStorage'

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  preload() {}

  create() {
    const userName = LocalStorage.retrieveItem('userName')
    const score = LocalStorage.retrieveItem('score'
    );
    this.creditsText = this.add.text(0, 0, "Credits", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.madeByText = this.add.text(0, 0, "Created By: Alexis Sanchez 👨🏽‍💻", {
      fontSize: "26px",
      fill: "#fff",
    });

    this.yourScoreis = this.add.text(0, 0, `${userName}'s score is: ${score} `, {
        fontSize: "50px",
        fill: "#a52aec",  
    })
    this.zone = this.add.zone(
      322.5,
      360,
      645,
      720
    );

    Phaser.Display.Align.In.Center(this.creditsText, this.zone);

    Phaser.Display.Align.In.Center(this.madeByText, this.zone);

    Phaser.Display.Align.In.Center(this.yourScoreis, this.zone)

    this.madeByText.setY(1000);
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
        duration: 3000,
        delay: 1000,
        onComplete: function () {
          this.madeByTween.destroy;
        }.bind(this)
      });

      this.creditsTween = this.tweens.add({
        targets: this.creditsText,
        y: -500,
        ease: 'Power1',
        duration: 8000,
        delay: 1000,
        onComplete: function () {
          this.destroy;
          this.scene.start('Title');
        }.bind(this)
      });

  }
}
