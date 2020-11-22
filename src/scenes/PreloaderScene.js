import "phaser";

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    // add logo image
    this.add.image(322.5, 280, "logo");

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(200.5, 480, 320, 50);



    const percentText = this.make.text({
      x: 320.5,
      y: 540,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: 315.5,
      y: 560,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(210, 490, 300 * value, 30);
    });

    // update file progress text
    this.load.on("fileprogress", function (file) {
      assetText.setText("Loading asset: " + file.key);
    });

    // remove progress bar when complete
    this.load.on(
      "complete",
      function () {
        progressBar.destroy();
        progressBox.destroy();
        percentText.destroy();
        assetText.destroy();
        this.ready();
      }.bind(this)
    );

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image("tiles", "map/map.png");
    this.load.image("player_retro_fight", "character_retro_back.png");
    this.load.image('box', 'grey_box.png');
    this.load.image('checkedBox', 'blue_boxCheckmark.png');
    this.load.image('blueButton1', 'blue_button02.png');
    this.load.image('blueButton2', 'blue_button03.png');
    this.load.audio('intro', ['music/intro.mp3'])
    this.load.audio('battleBoss', ['music/battle_boss.mp3'])
    this.load.audio('battleNormal', ['music/battle_normal.mp3'])
    this.load.audio('worldMusic', ['music/world.mp3'])
    
    this.load.spritesheet("boss1", "boss1.png", {
      frameWidth: 127,
      frameHeight: 125,
    });
    this.load.spritesheet("boss2", "boss2.png", {
      frameWidth: 127,
      frameHeight: 125,
    });
    this.load.spritesheet("boss3", "boss3.png", {
      frameWidth: 127,
      frameHeight: 125,
    });
    this.load.spritesheet("boss4", "boss4.png", {
      frameWidth: 127,
      frameHeight: 125,
    });
    this.load.spritesheet("boss5", "boss5.png", {
      frameWidth: 127,
      frameHeight: 125,
    });
    this.load.spritesheet("boss6", "boss6.png", {
      frameWidth: 127,
      frameHeight: 125,
    });
    this.load.image("fight-button", "fight-button.png");
    this.load.image("options-button", "options-button.png");
    this.load.image("score-button", "scores-button.png");
    this.load.image("gameLogo", "game-logo.png");
    this.load.image('credits-button', 'credits-button.png')
    // map in the json format
    this.load.tilemapTiledJSON("map", "map/mymap.json");
    this.load.spritesheet("player_retro", "character_retro.png", {
      frameWidth: 66,
      frameHeight: 100,
      setScale: 0.8,
    });
  }

  init () {
    this.readyCount = 0;
  }
   
  ready () {
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('World');
    }
  }

  create() {}
}
