import "phaser";

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super("Battle");
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");
    // player character - warrior
    const warrior = new PlayerCharacter(
      this,
      400,
      400,
      "player_retro",
      1,
      "Warrior",
      100,
      20
    );
    this.add.existing(warrior);
    
    const boss1 = new Enemy(this, 400, 100, 'boss1', null, 'Ancient', 50, 3);
    this.add.existing(boss1)
    this.heroes = [warrior]
    this.enemies = [boss1]
    this.units = this.heroes.concat(this.enemies)
    this.scene.launch("UI");
  }
}

// base class for heroes and enemies
const Unit = new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
  
    initialize: function Unit(scene, x, y, texture, type, hp, damage) {
      Phaser.GameObjects.Sprite.call(this, scene, x, y, texture);
      this.type = type;
      this.hp = hp;
      this.maxHp = this.hp;
      this.damage = damage; // default damage
      this.living = true;
      this.menuItem = null;
    },
  
  
    // attack the target unit
    attack(target) {
        target.takeDamage(this.damage);
    },
  
    takeDamage(damage) {
      this.hp -= damage;
    }
  });
  
  const Enemy = new Phaser.Class({
    Extends: Unit,
  
    initialize: function Enemy(scene, x, y, texture, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, type, hp, damage);
    },
  });
  
  const PlayerCharacter = new Phaser.Class({
    Extends: Unit,
  
    initialize: function PlayerCharacter(scene, x, y, texture, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, type, hp, damage);
      this.flipX = true;
      this.setScale(2);
    },
  });

