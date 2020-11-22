// let player;
let player_retro;
export default class WorldScene extends Phaser.Scene {
  constructor() {
    super("World");
  }

  //     init(data)
  // {
  //     console.log('init', data);
  //     this.oTiles = data.oTiles;
  // }

  create() {
    const map = this.make.tilemap({ key: "map" });
    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true) {
      console.log('Am i Working?')
      this.bgMusic = this.sound.add("worldMusic", { volume: 0.5, loop: true,});
      this.bgMusic.play();
      this.model.bgMusicPlaying = false
      this.sys.game.globals.bgMusic = this.bgMusic;
    }

    const tiles = map.addTilesetImage("main", "tiles");
    const bellowPlayer = map.createStaticLayer("Below Player", tiles, 0, 0);
    const worldLayer = map.createStaticLayer("World", tiles, 0, 0);
    // const obstacles = map.createStaticLayer("Obstacle", tiles, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });
    // player = this.physics.add.sprite(50, 100, "player", 6);
    player_retro = this.physics.add.sprite(64, 455, "player_retro", 6);
    player_retro.setScale(0.4);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.physics.add.collider(player_retro, worldLayer);
    player_retro.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Makes Camera to follow character
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cameras.main.startFollow(player_retro);
    this.cameras.main.roundPixels = true;

    //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player_retro", {
        start: 8,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // animation with key 'right'
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player_retro", {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player_retro", {
        frames: [4, 5, 6, 7],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player_retro", {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 10,
      repeat: -1,
    });

    // enemy setup
    this.spawns = this.physics.add.group({
      classType: Phaser.GameObjects.Zone,
    });
    // for (var i = 0; i < 6; i++) {
    //   var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    //   var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
    //   // parameters are x, y, width, height
    //   this.spawns.create(x, y, 35, 35);
    // }
    this.spawns.create(120, 590, 35, 35);
    this.spawns.create(600, 500, 35, 35)
    this.spawns.create(120, 120, 35, 35)
    this.spawns.create(580, 150, 35, 35)
    this.spawns.create(380, 100, 35, 35)
    this.spawns.create(350, 415, 35, 35)
    this.spawns.create(550, 415, 35, 35)
    
    this.physics.add.overlap(
      player_retro,
      this.spawns,
      this.onMeetEnemy,
      false,
      this
    );

    const scoreBox = this.add.image(20, 20, 'blueButton2');
    scoreBox.setScrollFactor(0, 0);
    scoreBox.scale = 0.5;

    this.textScore = this.add.text(2, 10, `Score: 0`, { fontSize: '14px', fill: '#fff' });
    this.textScore.setScrollFactor(0, 0);

    this.sys.events.on('wake', this.wake, this)
  }

  update() {
    player_retro.body.setVelocity(0);
    // Horizontal movement
    if (this.cursors.left.isDown) {
      player_retro.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      player_retro.body.setVelocityX(80);
    }
    // Vertical Movement
    if (this.cursors.up.isDown) {
      player_retro.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      player_retro.setVelocityY(80);
    }

    if (this.cursors.left.isDown) {
      player_retro.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      player_retro.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      player_retro.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      player_retro.anims.play("down", true);
    } else {
      player_retro.anims.stop();
    }
  }

  onMeetEnemy(player, zone) {
     // we move the zone to some other location
    //  zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    this.spawns.remove(this.spawns.getFirstAlive(), true, true)
    //  zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);       
    
    // shake the world
    this.cameras.main.shake(300)
    this.bgMusic.stop();
    this.game.sound.stopAll();
    this.sys.game.globals.bgMusic = this.bgMusic;
    this.scene.switch('Battle')
  }

  wake() {
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
}
}
