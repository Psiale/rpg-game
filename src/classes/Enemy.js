import Unit from './Unit'
import 'phaser'

export default class Enemy extends Unit {
    constructor(scene, x, y, texture, frame, type, hp, damage) {
        super('Enemy')
        new Unit(this, scene, x, y, texture, frame, type, hp, damage);
        this.setScale(2)
    }
}
