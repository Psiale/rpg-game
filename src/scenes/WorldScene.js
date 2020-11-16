let player;
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
    const aboveLayer = map.createStaticLayer("Above Player", tiles, 0, 0);
    // const obstacles = map.createStaticLayer("Obstacle", tiles, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });
    player = this.physics.add.sprite(50, 100, "player", 6);
    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // worldLayer.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    // });

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.physics.add.collider(player,worldLayer)
    // player.setCollideWorldBounds(true)

    this.cursors = this.input.keyboard.createCursorKeys();

    // Makes Camera to follow character
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player);
    this.cameras.main.roundPixels = true;

    //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    // animation with key 'right'
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [16, 17, 18, 19],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [4, 5, 6, 7],
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    player.body.setVelocity(0);
    // Horizontal movement
    if (this.cursors.left.isDown) {
      player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      player.body.setVelocityX(80);
    }
    // Vertical Movement
    if (this.cursors.up.isDown) {
      player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      player.setVelocityY(80);
    }

    if (this.cursors.left.isDown) {
      player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      player.anims.play("down", true);
    } else {
      player.anims.stop();
    }
  }
}
