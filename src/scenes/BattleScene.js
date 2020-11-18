import "phaser";

export class BattleScene extends Phaser.Scene {
  constructor() {
    super("Battle");
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");
    // player character - warrior
    const warrior = new PlayerCharacter(
      this,
      322.5,
      400,
      "player_retro_fight",
      1,
      "Warrior",
      100,
      20
    );
    this.add.existing(warrior);
    
    const boss1 = new Enemy(this, 322.5, 100, 'boss1', null, 'Ancient', 50, 3);
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

  // Menus start here 

  // The menu element (containers for enemy and hero options)
const MenuItem = new Phaser.Class({
    Extends: Phaser.GameObjects.Text,
    
    initialize:
            
    function MenuItem(x, y, text, scene) {
        Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15});
    },
    
    select: function() {
        this.setColor('#f8ff38');
    },
    
    deselect: function() {
        this.setColor('#ffffff');
    }
    
});

// The actual container of that menu
const Menu = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,
  
  initialize:
          
  function Menu(x, y, scene, heroes) {
      Phaser.GameObjects.Container.call(this, scene, x, y);
      this.menuItems = [];
      this.menuItemIndex = 0;
      this.heroes = heroes;
      this.x = x;
      this.y = y;
  },     
  addMenuItem: function(unit) {
      var menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
      this.menuItems.push(menuItem);
      this.add(menuItem);        
  },            
  moveSelectionUp: function() {
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex--;
      if(this.menuItemIndex < 0)
          this.menuItemIndex = this.menuItems.length - 1;
      this.menuItems[this.menuItemIndex].select();
  },
  moveSelectionDown: function() {
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex++;
      if(this.menuItemIndex >= this.menuItems.length)
          this.menuItemIndex = 0;
      this.menuItems[this.menuItemIndex].select();
  },
  // select the menu as a whole and an element with index from it
  select: function(index) {
      if(!index)
          index = 0;
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex = index;
      this.menuItems[this.menuItemIndex].select();
  },
  // deselect this menu
  deselect: function() {        
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex = 0;
  },
  confirm: function() {
      // wen the player confirms his slection, do the action
  }   
});


// type of menus, heroes and enemies

const HeroesMenu = new Phaser.Class({
  Extends: Menu,
  
  initialize:
          
  function HeroesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);                    
  }
});

const ActionsMenu = new Phaser.Class({
  Extends: Menu,
  
  initialize:
          
  function ActionsMenu(x, y, scene) {
      Menu.call(this, x, y, scene);   
      this.addMenuItem('Attack');
  },
  confirm: function() {
      // do something when the player selects an action
  }
  
});

const EnemiesMenu = new Phaser.Class({
  Extends: Menu,
  
  initialize:
          
  function EnemiesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);        
  },       
  confirm: function() {        
      // do something when the player selects an enemy
  }
});

// UIScene class
export class UIScene extends Phaser.Scene {
  constructor () {
      super('UI');
  }

  create() {
      this.graphics = this.add.graphics();
      this.graphics.lineStyle(1, 0xffffff);
      this.graphics.fillStyle(0x031f4c, 1);
      this.graphics.strokeRect(20, 600, 215, 100);
      this.graphics.fillRect(20, 600, 215, 100);
      this.graphics.strokeRect(216, 600, 215, 100);
      this.graphics.fillRect(216, 600, 215, 100);
      this.graphics.strokeRect(431, 600, 195, 100);
      this.graphics.fillRect(431, 600, 195, 100);

      // menu adding 
       // basic container to hold all menus
       this.menus = this.add.container();
              
       this.heroesMenu = new HeroesMenu(435, 590, this);           
       this.actionsMenu = new ActionsMenu(100, 153, this);            
       this.enemiesMenu = new EnemiesMenu(8, 153, this);   
       
       // the currently selected menu 
       this.currentMenu = this.actionsMenu;
       
       // add menus to the container
       this.menus.add(this.heroesMenu);
       this.menus.add(this.actionsMenu);
       this.menus.add(this.enemiesMenu);
      }
}
