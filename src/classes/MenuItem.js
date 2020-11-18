import 'phaser'
export default class MenuItem extends Phaser.GameObjects.Text { 
            
    constructor(x, y, text, scene) {
        super('MenuItem')
        Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15});
    }
    
    select() {
        this.setColor('#f8ff38');
    }
    
    deselect() {
        this.setColor('#ffffff');
    }
    
}