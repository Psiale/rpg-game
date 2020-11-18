import 'phaser'
import MenuItem from './MenuItem'
export default class Menu extends Phaser.GameObjects.Container { 
    
 constructor(x, y, scene, heroes) {
        super('Menu')
        Phaser.GameObjects.Container.call(this, scene, x, y);
        this.menuItems = [];
        this.menuItemIndex = 0;
        this.heroes = heroes;
        this.x = x;
        this.y = y;
    }  
    addMenuItem(unit) {
        const menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
        this.menuItems.push(menuItem);
        this.add(menuItem);        
    }            
    moveSelectionUp() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex--;
        if(this.menuItemIndex < 0)
            this.menuItemIndex = this.menuItems.length - 1;
        this.menuItems[this.menuItemIndex].select();
    }
    moveSelectionDown() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex++;
        if(this.menuItemIndex >= this.menuItems.length)
            this.menuItemIndex = 0;
        this.menuItems[this.menuItemIndex].select();
    }
    // select the menu as a whole and an element with index from it
    select(index) {
        if(!index)
            index = 0;
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = index;
        this.menuItems[this.menuItemIndex].select();
    }
    // deselect this menu
    deselect() {        
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
    }

    confirm() {
        // wen the player confirms his slection, do the action
    }   
  }