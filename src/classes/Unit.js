import 'phaser'


export default class Unit extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame, type, hp, damage) {
        super('Unit');
        Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
        this.type = type;
        this.maxHp =this.hp = hp;
        this.damage = damage;
    }
    attack(target) {
        target.takeDamage(this.damage)
    }

    takeDamage(damage) {
        this.hp -= damage;
    }

  }