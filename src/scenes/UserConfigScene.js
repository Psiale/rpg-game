import * as LocalStorage from '../helpers/localStorage';

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super('UserConfig');
  }

  preload() {
    this.load.html('nameform', 'text/loginform.html');
  }

  create() {
    const text = this.add.text(10, 10, 'Please login to play', {
      color: 'white',
      fontFamily: 'Arial',
      fontSize: '32px ',
    });

    const element = this.add.dom(400, 600).createFromCache('nameform');

    element.setPerspective(800);

    element.addListener('click');
    const self = this;

    element.on('click', function (event) {
      if (event.target.name === 'loginButton') {
        const inputUsername = this.getChildByName('username');

        //  Have they entered anything?
        if (inputUsername.value !== '') {
          //  Turn off the click events

          LocalStorage.saveItem('userName', inputUsername.value);
          this.removeListener('click');

          //  Tween the login form out
          this.scene.tweens.add({
            targets: element.rotate3d,
            x: 1,
            w: 90,
            duration: 3000,
            ease: 'Power3',
          });

          this.scene.tweens.add({
            targets: element,
            scaleX: 2,
            scaleY: 2,
            y: 700,
            duration: 3000,
            ease: 'Power3',
            onComplete() {
              element.setVisible(false);
            },
          });

          //  Populate the text with whatever they typed in as the username!
          //   text.setText("Welcome " + inputUsername.value);
          self.scene.start('Title');
        } else {
          //  Flash the prompt
          this.scene.tweens.add({
            targets: text,
            alpha: 0.1,
            duration: 200,
            ease: 'Power3',
            yoyo: true,
          });
        }
      }
    });

    this.tweens.add({
      targets: element,
      y: 300,
      duration: 3000,
      ease: 'Power3',
    });
  }
}
