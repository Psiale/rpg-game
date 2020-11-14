export default class WorldScene extends Phaser.Scene {
    constructor(){
        super('World')
    }
    preload() {

    }

    create() {
        const map = this.make.tilemap({ key: 'map'})   
        const tiles = map.addTilesetImage('spritesheet', 'tiles')
        const grass = map.createStaticLayer('Grass', tiles, 0, 0);
        const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
        obstacles.setCollisionByExclusion([-1]);
        this.player = this.physics.add.sprite(50,100,'player', 6)

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true)

        this.cursors = this.input.keyboard.createCursorKeys();

        // Makes Camera to follow character 
         this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
                this.cameras.main.startFollow(this.player);
                this.cameras.main.roundPixels = true;

                 //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11}),
            frameRate: 10,
            repeat: -1
        });
        
        // animation with key 'right'
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 12 , end: 15 , }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [16, 17, 18, 19]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 4, 5, 6, 7 ] }),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        this.player.body.setVelocity(0)
        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-80)
        } 
        else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(80)
        }
        // Vertical Movement
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-80);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(80)
        }

        if (this.cursors.left.isDown)
        {
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown)
        {
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.anims.play('down', true);
        }
        else
        {
            this.player.anims.stop();
        }
    }
}