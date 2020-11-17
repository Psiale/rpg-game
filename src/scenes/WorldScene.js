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
  preload() {
    this.load.image("oTiles", "map/o_spritesheet.png");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });

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
    for (var i = 0; i < 10; i++) {
      var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // parameters are x, y, width, height
      this.spawns.create(x, y, 20, 20);
    }
    this.physics.add.overlap(
      this.player,
      this.spawns,
      this.onMeetEnemy,
      false,
      this
    );
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
      
  }
}
