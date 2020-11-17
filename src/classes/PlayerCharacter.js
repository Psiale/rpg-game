import 'phaser'
import Unit from './Unit'

export default class PlayerCharacter extends Unit {
    constructor(scene, x, y, texture, frame, type, hp, damage) {
        super('Player')
        new Unit(this, scene, x, y, texture, frame, type, hp, damage);
        // flip the image so I don't have to edit it manually
        this.flipY = true;
        
        this.setScale(.5);
    }
}