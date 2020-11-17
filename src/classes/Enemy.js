import Unit from './Unit'
import 'phaser'

export default class Enemy extends Unit {
    constructor(scene, x, y, texture, frame, type, hp, damage) {
        Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    }
}
